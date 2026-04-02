const mongoose = require('mongoose');

const AboutSchema = new mongoose.Schema({
  bio: {
    type: String,
    required: true
  },
  education: [{
    degree: String,
    institution: String,
    year: String,
    description: String
  }],
  experience: [{
    title: String,
    company: String,
    period: String,
    description: String
  }],
  contactInfo: {
    email: String,
    github: String,
    linkedin: String,
    location: String
  },
  profileImage: String,
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('About', AboutSchema);