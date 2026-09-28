import React, { useEffect, useState } from 'react';
import axios from '../../api';
import toast from 'react-hot-toast';
import { FaTrash } from 'react-icons/fa';
import { useTheme } from '../../context/ThemeContext';

const AdminMessages = () => {
  const { theme } = useTheme();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');

  const getHeaders = () => ({
    'x-auth-token': token,
    'Content-Type': 'application/json'
  });

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/contact', {
        headers: getHeaders()
      });
      setMessages(response.data);
    } catch (error) {
      console.error('Error fetching messages:', error);
      toast.error('Failed to load messages');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      try {
        await axios.delete(
          `/api/contact/${id}`,
          { headers: getHeaders() }
        );
        toast.success('Message deleted successfully!');
        fetchMessages();
      } catch (error) {
        console.error('Error deleting message:', error);
        toast.error('Failed to delete message');
      }
    }
  };

  if (loading) return <div className="flex items-center justify-center min-h-screen">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8 text-primary">Messages</h1>

        <div className="grid gap-6">
          {messages.length === 0 ? (
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow text-center text-gray-500 dark:text-gray-400">
              No messages yet
            </div>
          ) : (
            messages.map(message => (
              <div key={message._id} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-primary">{message.name}</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">{message.email}</p>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">{new Date(message.createdAt).toLocaleDateString()}</p>
                  </div>
                  <button
                    onClick={() => handleDelete(message._id)}
                    className="text-red-500 hover:text-red-700 transition"
                    title="Delete"
                  >
                    <FaTrash className="text-lg" />
                  </button>
                </div>
                <h4 className="font-semibold mb-2 text-primary">{message.subject}</h4>
                <p className="text-gray-700 dark:text-gray-300">{message.message}</p>
              </div>
            ))
          )}
        </div>

        {/* Stats */}
        <div className="mt-8 p-6 bg-primary text-white rounded-lg">
          <p className="text-lg font-semibold">Total Messages: <span className="text-2xl">{messages.length}</span></p>
        </div>
      </div>
    </div>
  );
};

export default AdminMessages;
