import React, { useEffect, useState } from 'react';
import axios from '../../api';
import toast from 'react-hot-toast';
import { FaTrash, FaEdit, FaPlus } from 'react-icons/fa';
import { useTheme } from '../../context/ThemeContext';

const AdminProjects = () => {
  const { theme } = useTheme();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    technologies: '',
    category: 'web',
    featured: false
  });
  const token = localStorage.getItem('token');

  const getHeaders = () => ({
    'x-auth-token': token,
    'Content-Type': 'application/json'
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/projects');
      setProjects(response.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
      toast.error('Failed to load projects');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.description.trim()) {
      toast.error('Title and description are required');
      return;
    }

    try {
      const projectData = {
        ...formData,
        technologies: formData.technologies.split(',').map(t => t.trim()).filter(t => t)
      };
      
      if (editingId) {
        // Update project
        await axios.put(
          `/api/projects/${editingId}`,
          projectData,
          { headers: getHeaders() }
        );
        toast.success('Project updated successfully!');
      } else {
        // Create new project
        await axios.post(
          '/api/projects',
          projectData,
          { headers: getHeaders() }
        );
        toast.success('Project added successfully!');
      }
      handleCancel();
      fetchProjects();
    } catch (error) {
      console.error('Error saving project:', error);
      toast.error(error.response?.data?.message || 'Failed to save project');
    }
  };

  const handleEdit = (project) => {
    setEditingId(project._id);
    setFormData({
      title: project.title,
      description: project.description,
      technologies: project.technologies.join(', '),
      category: project.category,
      featured: project.featured || false
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await axios.delete(
          `/api/projects/${id}`,
          { headers: getHeaders() }
        );
        toast.success('Project deleted successfully!');
        fetchProjects();
      } catch (error) {
        console.error('Error deleting project:', error);
        toast.error(error.response?.data?.message || 'Failed to delete project');
      }
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData({
      title: '',
      description: '',
      technologies: '',
      category: 'web',
      featured: false
    });
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
        <h1 className="text-4xl font-bold mb-8 text-primary">Manage Projects</h1>

        <button
          onClick={toggleForm}
          className="btn-primary mb-6"
        >
          <FaPlus /> {showForm ? 'Cancel' : 'Add New Project'}
        </button>

        {showForm && (
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg mb-8">
            <h2 className="text-2xl font-bold mb-6 text-primary">
              {editingId ? 'Edit Project' : 'Add New Project'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold mb-2">Project Title</label>
                <input
                  type="text"
                  placeholder="e.g., Personal Portfolio"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-lg text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Description</label>
                <textarea
                  placeholder="Describe your project..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-lg text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-primary"
                  rows="4"
                  required
                ></textarea>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Technologies (comma-separated)</label>
                <input
                  type="text"
                  placeholder="e.g., React, Node.js, MongoDB"
                  value={formData.technologies}
                  onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                  className="w-full bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-lg text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-primary"
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
                    <option value="web">Web</option>
                    <option value="healthcare">Healthcare</option>
                    <option value="biometric">Biometric</option>
                    <option value="portfolio">Portfolio</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Featured</label>
                  <select
                    value={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.value === 'true' })}
                    className="w-full bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-lg text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="false">No</option>
                    <option value="true">Yes</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-4">
                <button type="submit" className="btn-primary">
                  {editingId ? 'Update Project' : 'Add Project'}
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

        {/* Projects List */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          {projects.length === 0 ? (
            <div className="p-8 text-center text-gray-500 dark:text-gray-400">
              No projects yet. Add one to get started!
            </div>
          ) : (
            <div className="grid gap-0">
              {projects.map(project => (
                <div key={project._id} className="p-6 border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-primary">{project.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">{project.description}</p>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <button
                        onClick={() => handleEdit(project)}
                        className="text-secondary hover:opacity-80 transition"
                        title="Edit"
                      >
                        <FaEdit className="text-lg" />
                      </button>
                      <button
                        onClick={() => handleDelete(project._id)}
                        className="text-red-500 hover:opacity-80 transition"
                        title="Delete"
                      >
                        <FaTrash className="text-lg" />
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {project.technologies?.map((tech, idx) => (
                      <span key={idx} className="text-xs bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 px-2 py-1 rounded">
                        {tech}
                      </span>
                    ))}
                    <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded">
                      {project.category}
                    </span>
                    {project.featured && (
                      <span className="text-xs bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 px-2 py-1 rounded">
                        ⭐ Featured
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="mt-8 p-6 bg-primary text-white rounded-lg">
          <p className="text-lg font-semibold">Total Projects: <span className="text-2xl">{projects.length}</span></p>
        </div>
      </div>
    </div>
  );
};

export default AdminProjects;
