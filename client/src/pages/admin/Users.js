import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FaTrash } from 'react-icons/fa';
import { useTheme } from '../../context/ThemeContext';

const AdminUsers = () => {
  const { theme } = useTheme();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');

  const getHeaders = () => ({
    'x-auth-token': token,
    'Content-Type': 'application/json'
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/api/users', {
        headers: getHeaders()
      });
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error('Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await axios.delete(
          `http://localhost:5000/api/users/${id}`,
          { headers: getHeaders() }
        );
        toast.success('User deleted successfully!');
        fetchUsers();
      } catch (error) {
        console.error('Error deleting user:', error);
        toast.error('Failed to delete user');
      }
    }
  };

  const handleRoleChange = async (id, newRole) => {
    try {
      await axios.put(
        `http://localhost:5000/api/users/${id}`,
        { role: newRole },
        { headers: getHeaders() }
      );
      toast.success('User role updated!');
      fetchUsers();
    } catch (error) {
      console.error('Error updating user:', error);
      toast.error('Failed to update user role');
    }
  };

  if (loading) return <div className="flex items-center justify-center min-h-screen">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <h1 className="text-4xl font-bold mb-8 text-primary">Manage Users</h1>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          {users.length === 0 ? (
            <div className="p-8 text-center text-gray-500 dark:text-gray-400">
              No users found
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100 dark:bg-gray-700 border-b">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Email</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Name</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Role</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Joined</th>
                    <th className="px-6 py-4 text-right text-sm font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(user => (
                    <tr key={user._id} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                      <td className="px-6 py-4">{user.email}</td>
                      <td className="px-6 py-4">{user.name}</td>
                      <td className="px-6 py-4">
                        <select
                          value={user.role}
                          onChange={(e) => handleRoleChange(user._id, e.target.value)}
                          className="bg-gray-100 dark:bg-gray-600 text-gray-900 dark:text-white px-3 py-1 rounded outline-none focus:ring-2 focus:ring-primary cursor-pointer"
                        >
                          <option value="user">User</option>
                          <option value="admin">Admin</option>
                        </select>
                      </td>
                      <td className="px-6 py-4">{new Date(user.createdAt).toLocaleDateString()}</td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => handleDelete(user._id)}
                          className="text-red-500 hover:text-red-700 transition"
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
          )}
        </div>

        {/* Stats */}
        <div className="mt-8 p-6 bg-primary text-white rounded-lg">
          <p className="text-lg font-semibold">Total Users: <span className="text-2xl">{users.length}</span></p>
        </div>
      </div>
    </div>
  );
};

export default AdminUsers;
