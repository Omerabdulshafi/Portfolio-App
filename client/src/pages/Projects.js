import React from 'react';

// Static data for Projects section
const projectsData = [
  {
    _id: 'https://mahama-care-hospital.vercel.app/',
    title: 'Healthcare Management System',
    description: 'A comprehensive web application for managing patient records, appointments, and medical history.',
    category: 'healthcare',
    imageUrl: '/healthcare.png',
    technologies: ['React', 'Node.js', 'MongoDB', 'Tailwind CSS']
  },
  {
    _id: 'http://10.70.162.72:3001/',
    title: 'Biometric Authentication App',
    description: 'Secure biometric-based authentication system for healthcare facilities.',
    category: 'biometric',
    imageUrl: '/biomrtric.png',
    technologies: ['React', 'Express.js', 'MongoDB', 'Security']
  },
  {
    _id: 'https://venerable-clafoutis-230d2f.netlify.app/',
    title: 'Personal Portfolio Website',
    description: 'Interactive portfolio website showcasing projects and skills with dark mode support.',
    category: 'portfolio',
    imageUrl: '/personal.png',
    technologies: ['React', 'Tailwind CSS', 'Node.js']
  },
  {
    _id: 'https://meek-maamoul-5167ea.netlify.app/',
    title: 'BIM Data Management Platform',
    description: 'Building Information Modeling platform for managing construction projects and data.',
    category: 'web',
    imageUrl: '/BIM.png',
    technologies: ['React', 'MongoDB', 'Express.js', 'Visualization']
  },
 
];

const Projects = () => {
  const projects = projectsData;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-black text-white py-20">
      <div className="container mx-auto px-4">
        <h1 className="text-5xl font-bold mb-12">Projects</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.length === 0 ? (
            <p className="col-span-3 text-gray-400">No projects available</p>
          ) : (
            projects.map((project, index) => (
              <a
                key={project._id}
                href={project._id}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800 rounded-lg overflow-hidden hover:transform hover:scale-105 transition"
              >
                <div 
                  className="aspect-video bg-cover bg-center flex items-end justify-start"
                  style={{
                    backgroundImage: project.imageUrl 
                      ? `url('${project.imageUrl}')` 
                      : `url('${getCategoryImage(project.category) || fallbackImages[index % fallbackImages.length]}')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                >
                  <div className="w-full bg-gradient-to-t from-black via-black to-transparent px-4 py-6">
                    <h3 className="text-2xl font-bold drop-shadow-lg">{project.title}</h3>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies?.slice(0, 3).map((tech, idx) => (
                      <span key={idx} className="text-xs bg-purple-600 px-2 py-1 rounded">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </a>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Projects;
