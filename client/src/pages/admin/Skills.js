import React, { useEffect, useState } from 'react';
import axios from '../../api';
import toast from 'react-hot-toast';
import { FaTrash, FaEdit, FaPlus } from 'react-icons/fa';
import { useTheme } from '../../context/ThemeContext';

const AdminSkills = () => {
  const { theme } = useTheme();
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ 
    name: '', 
    category: 'programming',
    level: 'Intermediate'
  });
  const token = localStorage.getItem('token');

  const getHeaders = () => ({
    'x-auth-token': token,
    'Content-Type': 'application/json'
  });

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/skills');
      setSkills(response.data);
    } catch (error) {
      console.error('Error fetching skills:', error);
      toast.error('Failed to load skills');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      toast.error('Skill name is required');
      return;
    }

    try {
      if (editingId) {
        // Update skill
        await axios.put(
          `/api/skills/${editingId}`,
          formData,
          { headers: getHeaders() }
        );
        toast.success('Skill updated successfully!');
      } else {
        // Create new skill
        await axios.post(
          '/api/skills',
          formData,
          { headers: getHeaders() }
        );
        toast.success('Skill added successfully!');
      }
      setFormData({ name: '', category: 'programming', level: 'Intermediate' });
      setShowForm(false);
      setEditingId(null);
      fetchSkills();
    } catch (error) {
      console.error('Error saving skill:', error);
      toast.error(error.response?.data?.message || 'Failed to save skill');
    }
  };

  const handleEdit = (skill) => {
    setEditingId(skill._id);
    setFormData({ 
      name: skill.name, 
      category: skill.category,
      level: skill.level
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this skill?')) {
      try {
        await axios.delete(
          `/api/skills/${id}`,
          { headers: getHeaders() }
        );
        toast.success('Skill deleted successfully!');
        fetchSkills();
      } catch (error) {
        console.error('Error deleting skill:', error);
        toast.error(error.response?.data?.message || 'Failed to delete skill');
      }
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData({ name: '', category: 'programming', level: 'Intermediate' });
  };

  const toggleForm = () => {
    if (showForm) {
      handleCancel();
    } else {
      setShowForm(true);
    }
  };

  if (loading) return <div className="flex items-center justify-center min-h-screen">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <h1 className="text-4xl font-bold mb-8 text-primary">Manage Skills</h1>

        <button
          onClick={toggleForm}
          className="btn-primary mb-6"
        >
          <FaPlus /> {showForm ? 'Cancel' : 'Add New Skill'}
        </button>

        {showForm && (
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg mb-8">
            <h2 className="text-2xl font-bold mb-6 text-primary">
              {editingId ? 'Edit Skill' : 'Add New Skill'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold mb-2">Skill Name</label>
                <input
                  type="text"
                  placeholder="e.g., React, Python, HTML"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-lg text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold mb-2">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-lg text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="programming">Programming</option>
                    <option value="health">Health</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Level</label>
                  <select
                    value={formData.level}
                    onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                    className="w-full bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-lg text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                    <option value="Expert">Expert</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-4">
                <button type="submit" className="btn-primary">
                  {editingId ? 'Update Skill' : 'Add Skill'}
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="btn-secondary"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Skills List */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          {skills.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100 dark:bg-gray-700 border-b">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Skill Name</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Category</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Level</th>
                    <th className="px-6 py-4 text-right text-sm font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {skills.map((skill) => (
                    <tr key={skill._id} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                      <td className="px-6 py-4">{skill.name}</td>
                      <td className="px-6 py-4">
                        <span className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm">
                          {skill.category}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-block bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-3 py-1 rounded-full text-sm">
                          {skill.level}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right flex gap-2 justify-end">
                        <button
                          onClick={() => handleEdit(skill)}
                          className="text-secondary hover:opacity-80 transition"
                          title="Edit"
                        >
                          <FaEdit className="text-lg" />
                        </button>
                        <button
                          onClick={() => handleDelete(skill._id)}
                          className="text-red-500 hover:opacity-80 transition"
                          title="Delete"
                        >
                          <FaTrash className="text-lg" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-8 text-center text-gray-500 dark:text-gray-400">
              No skills available. Add one to get started!
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="mt-8 p-6 bg-primary text-white rounded-lg">
          <p className="text-lg font-semibold">Total Skills: <span className="text-2xl">{skills.length}</span></p>
        </div>
      </div>
    </div>
  );
};

export default AdminSkills;
