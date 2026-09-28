import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../api';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { FaUsers, FaCode, FaProjectDiagram, FaBlog, FaEnvelope, FaUser } from 'react-icons/fa';

const AdminDashboard = () => {
  const { user } = useAuth();
  const { theme } = useTheme();
  const [stats, setStats] = useState({
    users: 0,
    skills: 0,
    projects: 0,
    blogs: 0,
    messages: 0
  });
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get('/api/admin/stats', {
          headers: { 'x-auth-token': token }
        });
        setStats(res.data);
      } catch (err) {
        console.error('Error fetching stats:', err);
      }
    };
    fetchStats();
  }, [token]);

  const statCards = [
    { title: 'Users', value: stats.users, icon: FaUsers, color: 'bg-blue-500', link: '/admin/users' },
    { title: 'About', value: '1', icon: FaUser, color: 'bg-indigo-500', link: '/admin/about' },
    { title: 'Skills', value: stats.skills, icon: FaCode, color: 'bg-green-500', link: '/admin/skills' },
    { title: 'Projects', value: stats.projects, icon: FaProjectDiagram, color: 'bg-purple-500', link: '/admin/projects' },
    { title: 'Blogs', value: stats.blogs, icon: FaBlog, color: 'bg-yellow-500', link: '/admin/blogs' },
    { title: 'Messages', value: stats.messages, icon: FaEnvelope, color: 'bg-red-500', link: '/admin/messages' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="container mx-auto px-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-8 mb-8">
          <h1 className="text-4xl font-bold mb-2 text-primary">Admin Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400">Welcome back, {user?.name}! Email: {user?.email}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
          {statCards.map((stat, index) => (
            <Link
              key={index}
              to={stat.link}
              className="bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition transform hover:scale-105"
            >
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm font-semibold">{stat.title}</p>
                    <p className="text-3xl font-bold text-primary mt-2">{stat.value}</p>
                  </div>
                  <div className={`${stat.color} text-white p-3 rounded-full text-2xl`}>
                    <stat.icon />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4 text-primary">Admin Resources</h2>
            <div className="space-y-3">
              <Link to="/admin/skills" className="block text-secondary hover:opacity-80 transition font-semibold">→ Manage Skills</Link>
              <Link to="/admin/projects" className="block text-secondary hover:opacity-80 transition font-semibold">→ Manage Projects</Link>
              <Link to="/admin/blogs" className="block text-secondary hover:opacity-80 transition font-semibold">→ Manage Blogs</Link>
              <Link to="/admin/about" className="block text-secondary hover:opacity-80 transition font-semibold">→ Edit About</Link>
              <Link to="/admin/users" className="block text-secondary hover:opacity-80 transition font-semibold">→ Manage Users</Link>
              <Link to="/admin/messages" className="block text-secondary hover:opacity-80 transition font-semibold">→ View Messages</Link>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4 text-primary">Admin Info</h2>
            <div className="space-y-2 text-gray-600 dark:text-gray-400">
              <p><strong>Name:</strong> {user?.name}</p>
              <p><strong>Email:</strong> {user?.email}</p>
              <p><strong>Admin Email for Verification:</strong> omarabdulshafa8@gmail.com</p>
              <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900 rounded text-sm">
                <p className="text-blue-800 dark:text-blue-200">
                  ℹ️ You can only manage content if you're logged in with admin privileges. All changes are saved to the backend.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;