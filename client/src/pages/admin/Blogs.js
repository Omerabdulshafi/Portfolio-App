import React, { useEffect, useState } from 'react';
import axios from '../../api';
import toast from 'react-hot-toast';
import { FaTrash, FaEdit, FaPlus } from 'react-icons/fa';
import { useTheme } from '../../context/ThemeContext';

const AdminBlogs = () => {
  const { theme } = useTheme();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    published: true
  });
  const token = localStorage.getItem('token');

  const getHeaders = () => ({
    'x-auth-token': token,
    'Content-Type': 'application/json'
  });

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/blogs');
      setBlogs(response.data);
    } catch (error) {
      console.error('Error fetching blogs:', error);
      toast.error('Failed to load blogs');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.content.trim()) {
      toast.error('Title and content are required');
      return;
    }

    try {
      if (editingId) {
        // Update blog
        await axios.put(
          `/api/blogs/${editingId}`,
          formData,
          { headers: getHeaders() }
        );
        toast.success('Blog updated successfully!');
      } else {
        // Create new blog
        await axios.post(
          '/api/blogs',
          formData,
          { headers: getHeaders() }
        );
        toast.success('Blog created successfully!');
      }
      handleCancel();
      fetchBlogs();
    } catch (error) {
      console.error('Error saving blog:', error);
      toast.error(error.response?.data?.message || 'Failed to save blog');
    }
  };

  const handleEdit = (blog) => {
    setEditingId(blog._id);
    setFormData({
      title: blog.title,
      content: blog.content,
      published: blog.published || true
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      try {
        await axios.delete(
          `/api/blogs/${id}`,
          { headers: getHeaders() }
        );
        toast.success('Blog deleted successfully!');
        fetchBlogs();
      } catch (error) {
        console.error('Error deleting blog:', error);
        toast.error(error.response?.data?.message || 'Failed to delete blog');
      }
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData({ title: '', content: '', published: true });
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
        <h1 className="text-4xl font-bold mb-8 text-primary">Manage Blogs</h1>

        <button
          onClick={toggleForm}
          className="btn-primary mb-6"
        >
          <FaPlus /> {showForm ? 'Cancel' : 'Add New Blog'}
        </button>

        {showForm && (
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg mb-8">
            <h2 className="text-2xl font-bold mb-6 text-primary">
              {editingId ? 'Edit Blog' : 'Add New Blog'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold mb-2">Blog Title</label>
                <input
                  type="text"
                  placeholder="Enter blog title..."
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-lg text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Blog Content</label>
                <textarea
                  placeholder="Enter blog content (Markdown supported)..."
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="w-full bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-lg text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-primary"
                  rows="10"
                  required
                ></textarea>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Published</label>
                <select
                  value={formData.published}
                  onChange={(e) => setFormData({ ...formData, published: e.target.value === 'true' })}
                  className="w-full bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-lg text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </div>
              <div className="flex gap-4">
                <button type="submit" className="btn-primary">
                  {editingId ? 'Update Blog' : 'Create Blog'}
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

        {/* Blogs List */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          {blogs.length === 0 ? (
            <div className="p-8 text-center text-gray-500 dark:text-gray-400">
              No blogs yet. Add one to get started!
            </div>
          ) : (
            <div className="divide-y dark:divide-gray-700">
              {blogs.map(blog => (
                <div key={blog._id} className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-primary">{blog.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mt-2 line-clamp-2">{blog.content}</p>
                      <div className="flex gap-3 mt-3">
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {new Date(blog.createdAt).toLocaleDateString()}
                        </span>
                        {blog.published && (
                          <span className="text-xs bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded">
                            Published
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <button
                        onClick={() => handleEdit(blog)}
                        className="text-secondary hover:opacity-80 transition"
                        title="Edit"
                      >
                        <FaEdit className="text-lg" />
                      </button>
                      <button
                        onClick={() => handleDelete(blog._id)}
                        className="text-red-500 hover:opacity-80 transition"
                        title="Delete"
                      >
                        <FaTrash className="text-lg" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="mt-8 p-6 bg-primary text-white rounded-lg">
          <p className="text-lg font-semibold">Total Blogs: <span className="text-2xl">{blogs.length}</span></p>
        </div>
      </div>
    </div>
  );
};

export default AdminBlogs;
