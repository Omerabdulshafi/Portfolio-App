const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

// Validate required environment variables
const requiredEnvs = ['MONGODB_URI', 'JWT_SECRET', 'ADMIN_EMAIL'];
const missingEnvs = requiredEnvs.filter(env => !process.env[env]);

if (missingEnvs.length > 0) {
  console.error('FATAL ERROR: Missing environment variables:', missingEnvs.join(', '));
  console.error('Please check your .env file.');
  process.exit(1);
}

const app = express();

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:5173'],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes - Define these at the top level
// Add this line with other routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/skills', require('./routes/skills'));
app.use('/api/projects', require('./routes/projects'));
app.use('/api/blogs', require('./routes/blogs'));
app.use('/api/about', require('./routes/about'));
app.use('/api/contact', require('./routes/contact'));
app.use('/api/admin', require('./routes/admin'));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running' });
});

// MongoDB Connection
const connectDB = async () => {
  const maxRetries = 5;
  let retries = 0;

  while (retries < maxRetries) {
    try {
      await mongoose.connect(process.env.MONGODB_URI, {
        maxPoolSize: 10,
        minPoolSize: 2,
        socketTimeoutMS: 45000,
        connectTimeoutMS: 10000,
        serverSelectionTimeoutMS: 5000,
        retryWrites: true,
        w: 'majority'
      });
      console.log('MongoDB Connected Successfully');

      const PORT = process.env.PORT || 5000;
      app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
      });
      return;
    } catch (err) {
      retries++;
      console.error(`Database connection failed (attempt ${retries}/${maxRetries}).`);
      console.error('Error:', err.message);

      if (err.message.includes('whitelist') || err.message.includes('IP')) {
        console.error('❌ IP Whitelist Issue Detected!');
        console.error('Solution: Add your IP address to MongoDB Atlas Network Access');
        console.error('1. Visit: https://cloud.mongodb.com');
        console.error('2. Go to: Security → Network Access');
        console.error('3. Click "Add IP Address" and add your current IP');
        process.exit(1);
      }

      if (retries < maxRetries) {
        const delay = Math.pow(2, retries) * 1000; // exponential backoff: 2s, 4s, 8s, 16s
        console.log(`Retrying in ${delay / 1000} seconds...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      } else {
        console.error('Max retries reached. Server not started.');
        process.exit(1);
      }
    }
  }
};

connectDB();

// Global Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    message: 'Internal Server Error', 
    error: process.env.NODE_ENV === 'development' ? err.message : undefined 
  });
});