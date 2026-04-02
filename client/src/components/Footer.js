import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Portfolio</h3>
            <p className="text-gray-400">Showcasing my work and skills.</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <nav className="space-y-8">
              <Link to="/" className="text-gray-400 hover:text-white">Home</Link>
              <Link to="/about" className="text-gray-400 hover:text-white">About</Link>
              <Link to="/projects" className="text-gray-400 hover:text-white">Projects</Link>
              <Link to="/blog" className="text-gray-400 hover:text-white">Blog</Link>
            </nav>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <p className="text-gray-400">Get in touch through the contact page</p>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8">
          <p className="text-center text-gray-400">&copy; {year} All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
