const express = require('express');
const router = express.Router();
const About = require('../models/About');
const auth = require('../middleware/auth');
const { isAdmin } = require('../middleware/auth');

// Get about info
router.get('/', async (req, res) => {
  try {
    let about = await About.findOne();
    if (!about) {
      about = new About({ bio: 'No bio available' });
      await about.save();
    }
    res.json(about);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update about info (admin only)
router.put('/', [auth, isAdmin], async (req, res) => {
  try {
    let about = await About.findOne();
    if (!about) {
      about = new About();
    }
    Object.assign(about, req.body);
    about.updatedAt = Date.now();
    await about.save();
    res.json(about);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;