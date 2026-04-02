import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Map category to default image
  const getCategoryImage = (category) => {
    const categoryImages = {
      healthcare: '/healthcare.png',
      biometric: '/biomrtric.png',
       portfolio: '/personal.png',
      web: '/BIM.png',
     
    };
   
  };

  // Fallback images for more variation
  const fallbackImages = [
    '/healthcare.png',
    '/biomrtric.png',
     '/personal.png',
    '/BIM.png',
   
    
  ];

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/projects');
        setProjects(response.data);
      } catch (err) {
        setError('Failed to load projects');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  if (error) return <div className="flex items-center justify-center min-h-screen text-red-500">{error}</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-black text-white py-20">
      <div className="container mx-auto px-4">
        <h1 className="text-5xl font-bold mb-12">Projects</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.length === 0 ? (
            <p className="col-span-3 text-gray-400">No projects available</p>
          ) : (
            projects.map((project, index) => (
              <Link
                key={project._id}
                to={`/projects/${project._id}`}
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
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Projects;
