import React, { useEffect, useState } from 'react';
import axios from 'axios';

const About = () => {
  const [about, setAbout] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/about');
        setAbout(response.data);
      } catch (err) {
        setError('Failed to load about information');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAbout();
  }, []);

  if (loading) return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  if (error) return <div className="flex items-center justify-center min-h-screen text-red-500">{error}</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-black text-white py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-5xl font-bold mb-12">About Me</h1>
        
        {about ? (
          <div className="space-y-8">
            <div className="bg-gray-800 rounded-lg p-8">
              <h2 className="text-3xl font-bold mb-4">Who I Am</h2>
              <p className="text-gray-300 leading-relaxed">{about.bio}</p>
            </div>

            {about.education && about.education.length > 0 && (
              <div className="bg-gray-800 rounded-lg p-8">
                <h2 className="text-3xl font-bold mb-6">Education</h2>
                <div className="space-y-4">
                  {about.education.map((edu, index) => (
                    <div key={index} className="border-l-4 border-purple-500 pl-4">
                      <h3 className="text-xl font-bold text-purple-400">{edu.degree}</h3>
                      <p className="text-gray-300">{edu.institution}</p>
                      <p className="text-sm text-gray-400">{edu.year}</p>
                      {edu.description && <p className="text-gray-400 mt-2">{edu.description}</p>}
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {about.experience && about.experience.length > 0 && (
              <div className="bg-gray-800 rounded-lg p-8">
                <h2 className="text-3xl font-bold mb-6">Experience</h2>
                <div className="space-y-4">
                  {about.experience.map((exp, index) => (
                    <div key={index} className="border-l-4 border-purple-500 pl-4">
                      <h3 className="text-xl font-bold text-purple-400">{exp.title}</h3>
                      <p className="text-gray-300">{exp.company}</p>
                      <p className="text-sm text-gray-400">{exp.period}</p>
                      {exp.description && <p className="text-gray-400 mt-2">{exp.description}</p>}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {about.contactInfo && (
              <div className="bg-gray-800 rounded-lg p-8">
                <h2 className="text-3xl font-bold mb-4">Get In Touch</h2>
                <div className="space-y-2 text-gray-300">
                  {about.contactInfo.email && (
                    <p>📧 Email: <a href={`mailto:${about.contactInfo.email}`} className="text-purple-400 hover:underline">{about.contactInfo.email}</a></p>
                  )}
                  {about.contactInfo.location && (
                    <p>📍 Location: {about.contactInfo.location}</p>
                  )}
                  {about.contactInfo.github && (
                    <p>🔗 GitHub: <a href={about.contactInfo.github} target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:underline">Visit Profile</a></p>
                  )}
                  {about.contactInfo.linkedin && (
                    <p>💼 LinkedIn: <a href={about.contactInfo.linkedin} target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:underline">Visit Profile</a></p>
                  )}
                </div>
              </div>
            )}
          </div>
        ) : (
          <p className="text-gray-400">No about information available</p>
        )}
      </div>
    </div>
  );
};

export default About;
