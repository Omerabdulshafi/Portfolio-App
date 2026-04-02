const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    unique: true,
    sparse: true,
    default: null
  },
  content: {
    type: String,
    required: true
  },
  excerpt: String,
  coverImage: String,
  tags: [String],
  published: {
    type: Boolean,
    default: true
  },
  views: {
    type: Number,
    default: 0
  },
  author: {
    type: String,
    default: 'Omer Abdulshafi'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Helper method to generate slug
BlogSchema.methods.generateSlug = function() {
  if (!this.slug && this.title) {
    this.slug = this.title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
    this.slug = `${this.slug}-${Date.now()}`;
  }
  return this.slug;
};

module.exports = mongoose.model('Blog', BlogSchema);