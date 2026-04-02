import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';
import Customization from './components/Customization';

// Layout
import Layout from './components/Layout';

// Public Pages
import Home from './pages/Home';
import About from './pages/About';
import Skills from './pages/Skills';
import Projects from './pages/Projects';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';

// Admin Pages
import AdminDashboard from './pages/admin/Dashboard';
import AdminSkills from './pages/admin/Skills';
import AdminProjects from './pages/admin/Projects';
import AdminBlogs from './pages/admin/Blogs';
import AdminMessages from './pages/admin/Messages';
import AdminUsers from './pages/admin/Users';
import AdminAbout from './pages/admin/About';

// User Pages
import UserDashboard from './pages/user/Dashboard';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Customization />
        <Routes>
        {/* Public Routes with Layout */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="skills" element={<Skills />} />
          <Route path="projects" element={<Projects />} />
          <Route path="blog" element={<Blog />} />
          <Route path="blog/:id" element={<BlogPost />} />
          <Route path="contact" element={<Contact />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>

        {/* User Dashboard Routes */}
        <Route path="/user" element={<PrivateRoute />}>
          <Route path="dashboard" element={<UserDashboard />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminRoute />}>
          <Route index element={<Navigate to="dashboard" />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="about" element={<AdminAbout />} />
          <Route path="skills" element={<AdminSkills />} />
          <Route path="projects" element={<AdminProjects />} />
          <Route path="blogs" element={<AdminBlogs />} />
          <Route path="messages" element={<AdminMessages />} />
          <Route path="users" element={<AdminUsers />} />
        </Route>
      </Routes>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;