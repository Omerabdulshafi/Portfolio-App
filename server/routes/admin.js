const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { isAdmin } = require('../middleware/auth');
const User = require('../models/User');
const Skill = require('../models/Skill');
const Project = require('../models/Project');
const Blog = require('../models/Blog');
const Contact = require('../models/Contact');

// Get admin dashboard stats
router.get('/stats', [auth, isAdmin], async (req, res) => {
  try {
    const [users, skills, projects, blogs, messages] = await Promise.all([
      User.countDocuments(),
      Skill.countDocuments(),
      Project.countDocuments(),
      Blog.countDocuments(),
      Contact.countDocuments()
    ]);
    
    res.json({
      users,
      skills,
      projects,
      blogs,
      messages
    });
  } catch (err) {
    console.error('Stats error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;