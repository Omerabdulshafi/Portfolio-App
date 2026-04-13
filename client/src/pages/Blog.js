import React from 'react';
import { Link } from 'react-router-dom';

// Static data for Blog section
const blogsData = [
  {
    _id: '1',
    title: 'Getting Started with MERN Stack',
    content: 'Learn how to build modern web applications using MongoDB, Express, React, and Node.js. This comprehensive guide covers setup, architecture, and best practices.',
    coverImage: '/weddev.png',
    tags: ['javascript', 'react', 'tutorial'],
    createdAt: new Date('2024-01-15')
  },
  {
    _id: '2',
    title: 'Health Tech Innovations in 2024',
    content: 'Exploring the latest innovations in healthcare technology and how they are transforming patient care. From telemedicine to AI-powered diagnostics.',
    coverImage: '/health-and-wellness.jpg',
    tags: ['health', 'tech', 'innovation'],
    createdAt: new Date('2024-02-10')
  },
  {
    _id: '3',
    title: 'Building Secure Web Applications',
    content: 'Security is paramount in web development. Learn about authentication, authorization, data encryption, and other essential security practices.',
    coverImage: '/Health-Tech.jpg',
    tags: ['web', 'security', 'tutorial'],
    createdAt: new Date('2024-01-28')
  },

  
];

const Blog = () => {
  const blogs = blogsData;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-black text-white py-20">
      <div className="container mx-auto px-4">
        <h1 className="text-5xl font-bold mb-12">Blog</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.length === 0 ? (
            <p className="col-span-3 text-gray-400">No blog posts available</p>
          ) : (
            blogs.map((blog, index) => (
              <Link
                key={blog._id}
                to={`/blog/${blog._id}`}
                className="bg-gray-800 rounded-lg overflow-hidden hover:transform hover:scale-105 transition"
              >
                <div 
                  className="aspect-video bg-cover bg-center flex items-end justify-start"
                  style={{
                    backgroundImage: blog.coverImage 
                      ? `url('${blog.coverImage}')` 
                      : `url('${getTagImage(blog.tags) || fallbackImages[index % fallbackImages.length]}')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                >
                  <div className="w-full bg-gradient-to-t from-black via-black to-transparent px-4 py-6">
                    <h3 className="text-2xl font-bold drop-shadow-lg">{blog.title}</h3>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-400 text-sm mb-4">
                    {new Date(blog.createdAt).toLocaleDateString()}
                  </p>
                  <p className="text-gray-300 mb-4 line-clamp-2">{blog.content}</p>
                  <div className="flex flex-wrap gap-2">
                    {blog.tags?.slice(0, 3).map((tag, idx) => (
                      <span key={idx} className="text-xs bg-purple-600 px-2 py-1 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Blog;
