import React, { useState, useEffect } from 'react';
import axios from '../../api';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';

const UserDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({ skills: 0, projects: 0, blogs: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [skillsRes, projectsRes, blogsRes] = await Promise.all([
        axios.get('/api/skills'),
        axios.get('/api/projects'),
        axios.get('/api/blogs')
      ]);
      setStats({
        skills: skillsRes.data.length,
        projects: projectsRes.data.length,
        blogs: blogsRes.data.length
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
      toast.error('Failed to load statistics');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-12">
      <div className="container mx-auto px-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome, {user?.name}!</h1>
          <p className="text-gray-600 dark:text-gray-400">Your personal portfolio dashboard</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Portfolio Overview</h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center border-b pb-2">
                <span className="text-gray-600 dark:text-gray-400">Technical Skills</span>
                <span className="font-bold text-xl text-blue-600">{stats.skills}</span>
              </div>
              <div className="flex justify-between items-center border-b pb-2">
                <span className="text-gray-600 dark:text-gray-400">Projects</span>
                <span className="font-bold text-xl text-blue-600">{stats.projects}</span>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Quick Links</h2>
            <div className="space-y-2">
              <a href="/skills" className="block text-blue-600 hover:underline">View Skills</a>
              <a href="/projects" className="block text-blue-600 hover:underline">View Projects</a>
              <a href="/blog" className="block text-blue-600 hover:underline">Read Blog</a>
              <a href="/contact" className="block text-blue-600 hover:underline">Contact Admin</a>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Account Information</h2>
          <div className="space-y-3">
            <div className="flex items-center">
              <span className="font-medium w-24">Name:</span>
              <span>{user?.name}</span>
            </div>
            <div className="flex items-center">
              <span className="font-medium w-24">Email:</span>
              <span>{user?.email}</span>
            </div>
            <div className="flex items-center">
              <span className="font-medium w-24">Role:</span>
              <span className="capitalize">{user?.role}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;