import React, { useEffect, useState } from 'react';
import axios from '../../api';
import toast from 'react-hot-toast';
import { useTheme } from '../../context/ThemeContext';

const AdminAbout = () => {
  const { theme } = useTheme();
  const [about, setAbout] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    bio: '',
    education: '',
    experience: ''
  });

  const token = localStorage.getItem('token');

  const getHeaders = () => ({
    'x-auth-token': token,
    'Content-Type': 'application/json'
  });

  useEffect(() => {
    fetchAbout();
  }, []);

  const fetchAbout = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/about');
      setAbout(response.data);
      setFormData({
        bio: response.data.bio || '',
        education: Array.isArray(response.data.education) ? JSON.stringify(response.data.education, null, 2) : '',
        experience: Array.isArray(response.data.experience) ? JSON.stringify(response.data.experience, null, 2) : ''
      });
    } catch (error) {
      console.error('Error fetching about:', error);
      toast.error('Failed to load about information');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const submitData = {
        bio: formData.bio,
        education: formData.education ? JSON.parse(formData.education) : [],
        experience: formData.experience ? JSON.parse(formData.experience) : []
      };
      
      await axios.put(
        '/api/about',
        submitData,
        { headers: getHeaders() }
      );
      toast.success('About information updated successfully!');
      setIsEditing(false);
      fetchAbout();
    } catch (error) {
      console.error('Error updating about:', error);
      toast.error(error.response?.data?.message || 'Failed to update about information. Make sure education and experience are valid JSON arrays.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (loading) return <div className="flex items-center justify-center min-h-screen">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-8">
          <h1 className="text-4xl font-bold mb-8 text-primary">Manage About Section</h1>

          {!isEditing && about ? (
            <div className="space-y-6 mb-8">
              <div>
                <h3 className="text-xl font-semibold mb-2 text-primary">Bio</h3>
                <p className="text-gray-600 dark:text-gray-400 whitespace-pre-wrap">{about.bio || 'No bio available'}</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-primary">Education</h3>
                {Array.isArray(about.education) && about.education.length > 0 ? (
                  <div className="space-y-3">
                    {about.education.map((edu, index) => (
                      <div key={index} className="border-l-4 border-primary pl-4 text-gray-600 dark:text-gray-400">
                        <p className="font-semibold">{edu.degree}</p>
                        <p className="text-sm">{edu.institution}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-500">{edu.year}</p>
                        {edu.description && <p className="text-sm mt-1">{edu.description}</p>}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-600 dark:text-gray-400">No education information available</p>
                )}
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-primary">Experience</h3>
                {Array.isArray(about.experience) && about.experience.length > 0 ? (
                  <div className="space-y-3">
                    {about.experience.map((exp, index) => (
                      <div key={index} className="border-l-4 border-primary pl-4 text-gray-600 dark:text-gray-400">
                        <p className="font-semibold">{exp.title}</p>
                        <p className="text-sm">{exp.company}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-500">{exp.period}</p>
                        {exp.description && <p className="text-sm mt-1">{exp.description}</p>}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-600 dark:text-gray-400">No experience information available</p>
                )}
              </div>
              <button
                onClick={() => setIsEditing(true)}
                className="btn-primary"
              >
                Edit About
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold mb-2">Bio</label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  placeholder="Enter your bio..."
                  className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg outline-none focus:ring-2 focus:ring-primary"
                  rows="5"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Education (JSON Array)</label>
                <p className="text-xs text-gray-500 mb-2">Format: [&#123;"degree": "BS Computer Science", "institution": "University", "year": "2020", "description": ""&#125;]</p>
                <textarea
                  name="education"
                  value={formData.education}
                  onChange={handleChange}
                  placeholder='[{"degree": "Your Degree", "institution": "Your Institution", "year": "2020", "description": "optional"}]'
                  className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg outline-none focus:ring-2 focus:ring-primary font-mono text-sm"
                  rows="5"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Experience (JSON Array)</label>
                <p className="text-xs text-gray-500 mb-2">Format: [&#123;"title": "Job Title", "company": "Company", "period": "2020-2021", "description": ""&#125;]</p>
                <textarea
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  placeholder='[{"title": "Your Title", "company": "Company", "period": "2020-2021", "description": "optional"}]'
                  className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg outline-none focus:ring-2 focus:ring-primary font-mono text-sm"
                  rows="5"
                />
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  className="btn-primary"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsEditing(false);
                    setFormData({
                      bio: about.bio || '',
                      education: Array.isArray(about.education) ? JSON.stringify(about.education, null, 2) : '',
                      experience: Array.isArray(about.experience) ? JSON.stringify(about.experience, null, 2) : ''
                    });
                  }}
                  className="btn-secondary"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminAbout;
