const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Skill = require('./models/Skill');
const Project = require('./models/Project');
const About = require('./models/About');
const User = require('./models/User');

dotenv.config();

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await Skill.deleteMany({});
    await Project.deleteMany({});
    console.log('Cleared existing data');

    // Create/Update Admin User
    const adminEmail = 'omarabdulshafa8@gmail.com';
    const existingAdmin = await User.findOne({ email: adminEmail });
    
    if (!existingAdmin) {
      const adminUser = new User({
        name: 'Admin',
        email: adminEmail,
        password: 'admin123', // You should change this to a secure password
        role: 'admin'
      });
      await adminUser.save();
      console.log(`✓ Created admin user: ${adminEmail}`);
    } else {
      // Update existing user to admin role if not already
      if (existingAdmin.role !== 'admin') {
        existingAdmin.role = 'admin';
        await existingAdmin.save();
        console.log(`✓ Updated user to admin role: ${adminEmail}`);
      } else {
        console.log(`✓ Admin user already exists: ${adminEmail}`);
      }
    }

    // Add Skills
    const skills = [
      // Programming Skills
      { name: 'HTML', category: 'programming', level: 'Advanced', order: 1 },
      { name: 'CSS', category: 'programming', level: 'Advanced', order: 2 },
      { name: 'Tailwind CSS', category: 'programming', level: 'Advanced', order: 3 },
      { name: 'JavaScript', category: 'programming', level: 'Advanced', order: 4 },
      { name: 'Git & GitHub', category: 'programming', level: 'Advanced', order: 5 },
      { name: 'React', category: 'programming', level: 'Advanced', order: 6 },
      { name: 'Node.js', category: 'programming', level: 'Intermediate', order: 7 },
      { name: 'Express', category: 'programming', level: 'Intermediate', order: 8 },
      { name: 'MongoDB', category: 'programming', level: 'Intermediate', order: 9 },
      { name: 'SQL', category: 'programming', level: 'Intermediate', order: 10 },
      { name: 'Python', category: 'programming', level: 'Intermediate', order: 11 },
      
      // Health Skills
      { name: 'Health Education', category: 'health', level: 'Advanced', order: 1 },
      { name: 'Community Health Worker', category: 'health', level: 'Advanced', order: 2 },
      { name: 'Basics of Pharmacology', category: 'health', level: 'Intermediate', order: 3 },
      { name: 'OPD Worker', category: 'health', level: 'Advanced', order: 4 },
    ];

    const createdSkills = await Skill.insertMany(skills);
    console.log(`✓ Added ${createdSkills.length} skills`);

    // Add Projects
    const projects = [
      {
        title: 'Personal Portfolio',
        description: 'A professional portfolio website showcasing my skills, projects, and services. Built with React, Node.js, and MongoDB with admin dashboard for content management.',
        technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS'],
        category: 'portfolio',
        featured: true,
        order: 1
      },
      {
        title: 'BIM Calculator',
        description: 'A Body Mass Index (BMI) calculator application for health assessment. Provides personalized health recommendations based on BMI calculations.',
        technologies: ['HTML', 'CSS', 'JavaScript', 'React'],
        category: 'healthcare',
        featured: true,
        order: 2
      },
      {
        title: 'Healthcare Website',
        description: 'A comprehensive healthcare website providing health education, services information, and patient dashboard. Integrated with modern healthcare features.',
        technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS'],
        category: 'healthcare',
        featured: true,
        order: 3
      },
      {
        title: 'Biometric Registration Website',
        description: 'A secure biometric registration and identification system. Includes user verification, data management, and admin controls.',
        technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'SQL'],
        category: 'biometric',
        featured: true,
        order: 4
      }
    ];

    const createdProjects = await Project.insertMany(projects);
    console.log(`✓ Added ${createdProjects.length} projects`);

    // Add/Update About Information
    const aboutData = {
      bio: 'Full-stack developer and healthcare professional with expertise in building modern web applications and healthcare solutions. Passionate about combining technology and health education to create meaningful impact.',
      contactInfo: {
        email: 'omarabdushafa8@gmail.com',
        github: '',
        linkedin: '',
        location: ''
      },
      education: [
        {
          degree: 'Health Education & Community Health',
          institution: 'Healthcare Institute',
          year: '2023',
          description: 'Specialized in health education and community health worker training'
        },
        {
          degree: 'Full-Stack Web Development',
          institution: 'Self-Taught/Online',
          year: '2024',
          description: 'Mastered modern web development with React, Node.js, and MongoDB'
        }
      ],
      experience: [
        {
          title: 'Health Education Specialist',
          company: 'Community Health Services',
          period: '2022 - Present',
          description: 'Providing health education and community health worker services'
        },
        {
          title: 'Full-Stack Developer',
          company: 'Self-Employed',
          period: '2024 - Present',
          description: 'Building healthcare dashboards, websites, and health education applications'
        }
      ]
    };

    const updatedAbout = await About.findOneAndUpdate(
      {},
      aboutData,
      { upsert: true, returnDocument: 'after' }
    );
    console.log('✓ Added/Updated about information');

    console.log('\n✅ Database seeding completed successfully!');
    console.log('\nServices You Provide:');
    console.log('  • Build Personal Portfolio');
    console.log('  • Healthcare Dashboard Development');
    console.log('  • Healthcare Website Development');
    console.log('  • Health Education Applications');
    console.log('\nAdmin Email: omarabdushafa8@gmail.com');
    console.log('  • Full access to add/delete/edit all sections');
    console.log('  • Manage skills, projects, and services');
    console.log('\nUser Dashboard:');
    console.log('  • View total skills');
    console.log('  • View all projects');
    console.log('  • View services offered');

    process.exit(0);
  } catch (err) {
    console.error('Error seeding database:', err.message);
    process.exit(1);
  }
};

seedDatabase();
