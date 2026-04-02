const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Blog = require('./models/Blog');

dotenv.config();

const blogs = [
  {
    title: 'Tech for Health',
    content: `Digital Tools & Innovation in Healthcare

This section combines technology and healthcare to explore how digital solutions can improve health services. It focuses on tools like mobile health apps, telemedicine, electronic health records, and health information systems.

You will discover how technology can help track diseases, improve communication between patients and healthcare providers, and increase access to medical services—especially in underserved areas.

It also includes ideas and projects for developers who want to build health-related applications, such as symptom checkers, appointment systems, and health education platforms.`,
    published: true,
    tags: ['healthcare', 'technology', 'digital-health', 'telemedicine']
  },
  {
    title: 'Health & Wellness',
    content: `Mental Health, Community Stories & Well-being

This section explores the importance of physical and mental well-being, especially in communities facing challenges such as displacement or limited resources. It provides simple, practical advice on maintaining a healthy lifestyle, managing stress, and improving mental health.

You will read inspiring community stories, health education tips, and guidance on topics like hygiene, nutrition, and disease prevention. The goal is to raise awareness and empower individuals to take better care of themselves and others.

This blog also highlights the role of community health workers and promotes positive habits that improve overall quality of life.`,
    published: true,
    tags: ['health', 'wellness', 'mental-health', 'community']
  },
  {
    title: 'Web Dev Essentials',
    content: `HTML, CSS, JS & Full-Stack Development

This section focuses on the fundamentals and advanced concepts of modern web development. It covers everything from building simple static pages using HTML and CSS to creating dynamic, interactive applications with JavaScript and full-stack technologies.

You will find tutorials, practical projects, and coding tips that help beginners and intermediate developers improve their skills. Topics include responsive design, version control with Git, frontend frameworks like React, backend development using Node.js and Express, and working with databases such as MongoDB and SQL.

This blog also shares real-world project ideas, debugging techniques, and best practices to help you become a professional full-stack developer.`,
    published: true,
    tags: ['web-development', 'javascript', 'react', 'nodejs', 'tutorial']
  }
];

const addBlogs = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    for (const blogData of blogs) {
      const existingBlog = await Blog.findOne({ title: blogData.title });
      
      if (!existingBlog) {
        const blog = new Blog(blogData);
        blog.generateSlug(); // Generate slug before saving
        await blog.save();
        console.log(`✓ Added blog: ${blogData.title}`);
      } else {
        console.log(`⚠ Blog already exists: ${blogData.title}`);
      }
    }

    console.log('\n✅ Blogs added successfully!');
    process.exit(0);
  } catch (err) {
    console.error('Error adding blogs:', err.message);
    process.exit(1);
  }
};

addBlogs();
