import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
  const { user, logout, isAdmin } = useAuth();
  const { theme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-xl font-bold text-primary dark:text-primary">
            Omer Abdulshafi
          </Link>

          <div className="hidden md:flex space-x-6">
            <Link to="/" className="hover:text-primary transition">Home</Link>
            <Link to="/about" className="hover:text-primary transition">About</Link>
            <Link to="/skills" className="hover:text-primary transition">Skills</Link>
            <Link to="/projects" className="hover:text-primary transition">Projects</Link>
            <Link to="/blog" className="hover:text-primary transition">Blog</Link>
            <Link to="/contact" className="hover:text-primary transition">Contact</Link>
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <>
                {isAdmin && (
                  <Link to="/admin/dashboard" className="text-accent hover:text-opacity-80">
                    Admin
                  </Link>
                )}
                <Link to="/user/dashboard" className="hover:text-primary">
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="btn-secondary"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="hover:text-primary">Login</Link>
                <Link to="/register" className="btn-primary">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;