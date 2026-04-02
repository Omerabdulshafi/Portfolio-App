const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');
const auth = require('../middleware/auth');
const { isAdmin } = require('../middleware/auth');

// Get all blogs
router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.find({ published: true }).sort('-createdAt');
    res.json(blogs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get single blog
router.get('/:id', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    blog.views += 1;
    await blog.save();
    res.json(blog);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create blog (admin only)
router.post('/', [auth, isAdmin], async (req, res) => {
  try {
    const blog = new Blog(req.body);
    blog.generateSlug(); // Auto-generate slug
    await blog.save();
    res.status(201).json(blog);
  } catch (err) {
    console.error('Blog creation error:', err);
    res.status(400).json({ 
      message: err.message || 'Failed to create blog',
      error: process.env.NODE_ENV === 'development' ? err : undefined
    });
  }
});

// Update blog (admin only)
router.put('/:id', [auth, isAdmin], async (req, res) => {
  try {
    // If updating title, regenerate slug
    if (req.body.title && !req.body.slug) {
      req.body.slug = req.body.title
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');
      req.body.slug = `${req.body.slug}-${Date.now()}`;
    }
    
    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.json(blog);
  } catch (err) {
    console.error('Blog update error:', err);
    res.status(400).json({ 
      message: err.message || 'Failed to update blog',
      error: process.env.NODE_ENV === 'development' ? err : undefined
    });
  }
});

// Delete blog (admin only)
router.delete('/:id', [auth, isAdmin], async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.json({ message: 'Blog deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;