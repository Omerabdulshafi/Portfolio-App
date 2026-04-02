const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const auth = require('../middleware/auth');

// @route   POST /api/auth/register
// @desc    Register a user
// @access  Public
router.post('/register', async (req, res) => {
  console.log('\n========== REGISTRATION REQUEST ==========');
  console.log('Request body:', JSON.stringify(req.body, null, 2));
  console.log('Headers:', req.headers);
  
  try {
    const { name, email, password } = req.body;
    
    // Validate input
    if (!name || !email || !password) {
      console.log('❌ Missing fields:', { 
        hasName: !!name, 
        hasEmail: !!email, 
        hasPassword: !!password 
      });
      return res.status(400).json({ 
        message: 'Please provide name, email and password' 
      });
    }
    
    console.log('✓ Validation passed');
    console.log('Checking if user exists...');
    
    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('❌ User already exists:', email);
      return res.status(400).json({ message: 'User already exists' });
    }
    
    console.log('✓ User does not exist');
    console.log('Creating new user...');
    
    // Create user
    const user = new User({
      name,
      email,
      password
    });
    
    console.log('User object created, saving to database...');
    await user.save();
    
    console.log('✓ User saved successfully, ID:', user._id);
    console.log('Creating JWT token...');
    
    // Create token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
    
    console.log('✓ Token created');
    console.log('Sending response...');
    
    // Return response
    res.status(201).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
    
    console.log('✓ Registration successful\n');
  } catch (err) {
    console.error('\n❌ REGISTRATION ERROR ❌');
    console.error('Error name:', err.name);
    console.error('Error message:', err.message);
    console.error('Error stack:', err.stack);
    console.error('Full error object:', err);
    
    // Check for specific errors
    if (err.name === 'ValidationError') {
      console.error('Validation errors:', err.errors);
      return res.status(400).json({ 
        message: 'Validation error', 
        errors: err.errors 
      });
    }
    
    if (err.code === 11000) {
      console.error('Duplicate key error');
      return res.status(400).json({ message: 'Email already exists' });
    }
    
    res.status(500).json({ 
      message: 'Server error during registration',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined,
      stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
  }
});

// @route   POST /api/auth/login
// @desc    Login user
// @access  Public
router.post('/login', async (req, res) => {
  console.log('\n========== LOGIN REQUEST ==========');
  console.log('Request body:', { email: req.body.email, password: '***' });
  
  try {
    const { email, password } = req.body;
    
    // Validate input
    if (!email || !password) {
      console.log('❌ Missing credentials');
      return res.status(400).json({ message: 'Please provide email and password' });
    }
    
    console.log('Finding user by email:', email);
    
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      console.log('❌ User not found:', email);
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    
    console.log('✓ User found, verifying password...');
    
    // Verify password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      console.log('❌ Invalid password for user:', email);
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    
    console.log('✓ Password verified');
    console.log('Creating token...');
    
    // Create token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
    
    console.log('✓ Login successful for:', email);
    
    // Return response
    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    console.error('\n❌ LOGIN ERROR ❌');
    console.error('Error message:', err.message);
    console.error('Error stack:', err.stack);
    res.status(500).json({ 
      message: 'Server error during login',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
});

// @route   GET /api/auth/me
// @desc    Get current user
// @access  Private
router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    console.error('Auth me error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;