import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/skills');
        setSkills(response.data);
      } catch (err) {
        setError('Failed to load skills');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  if (loading) return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  if (error) return <div className="flex items-center justify-center min-h-screen text-red-500">{error}</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-black text-white py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-5xl font-bold mb-12">Skills</h1>
        
        {/* Group skills by category */}
        <div className="space-y-12">
          {/* Programming Skills */}
          <div>
            <h2 className="text-3xl font-bold mb-6 text-blue-400">Programming Skills</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {skills
                .filter(s => s.category === 'programming')
                .length === 0 ? (
                <p className="col-span-2 text-gray-400">No programming skills available</p>
              ) : (
                skills
                  .filter(s => s.category === 'programming')
                  .map(skill => (
                    <div key={skill._id} className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="text-xl font-bold">{skill.name}</h3>
                        <span className="text-sm bg-purple-600 px-3 py-1 rounded text-purple-100">{skill.level}</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-300"
                          style={{
                            width: skill.level === 'Beginner' ? '25%' : 
                                   skill.level === 'Intermediate' ? '50%' : 
                                   skill.level === 'Advanced' ? '75%' : '100%'
                          }}
                        ></div>
                      </div>
                    </div>
                  ))
              )}
            </div>
          </div>

          {/* Health Skills */}
          <div>
            <h2 className="text-3xl font-bold mb-6 text-green-400">Health Skills</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {skills
                .filter(s => s.category === 'health')
                .length === 0 ? (
                <p className="col-span-2 text-gray-400">No health skills available</p>
              ) : (
                skills
                  .filter(s => s.category === 'health')
                  .map(skill => (
                    <div key={skill._id} className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="text-xl font-bold">{skill.name}</h3>
                        <span className="text-sm bg-green-600 px-3 py-1 rounded text-green-100">{skill.level}</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-green-500 to-teal-500 h-2 rounded-full transition-all duration-300"
                          style={{
                            width: skill.level === 'Beginner' ? '25%' : 
                                   skill.level === 'Intermediate' ? '50%' : 
                                   skill.level === 'Advanced' ? '75%' : '100%'
                          }}
                        ></div>
                      </div>
                    </div>
                  ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skills;
