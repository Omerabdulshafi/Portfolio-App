import React from 'react';

// Static data for Skills section
const skillsData = [
  // Programming Skills
  { _id: '1', name: 'JavaScript', category: 'programming', level: 'Advanced' },
  { _id: '2', name: 'React', category: 'programming', level: 'Advanced' },
  { _id: '3', name: 'Node.js', category: 'programming', level: 'Advanced' },
  { _id: '4', name: 'MongoDB', category: 'programming', level: 'Advanced' },
  { _id: '5', name: 'HTML & CSS', category: 'programming', level: 'Advanced' },
  { _id: '6', name: 'Tailwind CSS', category: 'programming', level: 'Advanced' },
  { _id: '7', name: 'Express.js', category: 'programming', level: 'Intermediate' },
  { _id: '8', name: 'REST APIs', category: 'programming', level: 'Advanced' },
  { _id: '9', name: 'Python', category: 'programming', level: 'Intermediate' },
  { _id: '10', name: 'Git & GitHub', category: 'programming', level: 'Advanced' },
  
  // Health Skills
  { _id: '11', name: 'Health Informatics', category: 'health', level: 'Advanced' },
  { _id: '12', name: 'Data Analysis', category: 'health', level: 'Intermediate' },
  { _id: '13', name: 'Healthcare Systems', category: 'health', level: 'Intermediate' },
  { _id: '14', name: 'Public Health', category: 'health', level: 'Advanced' },
  { _id: '15', name: 'EHR Systems', category: 'health', level: 'Beginner' },
  { _id: '16', name: 'Medical Coding', category: 'health', level: 'Beginner' },
];

const Skills = () => {
  const skills = skillsData;

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
