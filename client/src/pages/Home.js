import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '../api';
import { FaCode, FaHeartbeat, FaLaptopCode } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';
import TypeWriter from '../components/TypeWriter';

const Home = () => {
  const [stats, setStats] = useState({ skills: 0, projects: 0 });
  const { theme } = useTheme();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [skillsRes, projectsRes] = await Promise.all([
          axios.get('/api/skills'),
          axios.get('/api/projects')
        ]);
        setStats({
          skills: skillsRes.data.length,
          projects: projectsRes.data.length
        });
      } catch (err) {
        console.error('Error fetching stats:', err);
      }
    };
    fetchStats();
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-brand-purple to-brand-black text-white py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Left side - Image */}
            <div className="flex justify-center">
              <img 
                src="/profile.png" 
                alt="Omer Abdulshafi" 
                className=" w-80 h-auto object-cover"
              />
            </div>
            {/* Right side - Text */}
            <div className="text-center md:text-left">
              <h1 className="text-5xl font-bold mb-4">Omer Abdulshafi</h1>
              <p className="text-xl mb-6 h-8">
                <TypeWriter 
                  text="Full Stack Developer | Public Health Student" 
                  speed={50}
                  className="text-yellow-500 font-bold"
                />
              </p>
              <p className="text-lg max-w-2xl mb-8">
                Bridging technology and healthcare to create impactful digital solutions that improve lives.
              </p>
              <div className="flex justify-center md:justify-start gap-4">
                <Link to="/projects" className="btn-primary">
                  View Projects
                </Link>
                <Link to="/contact" className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition">
                  Contact Me
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-gray-100 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow">
              <FaCode className="text-4xl text-primary mx-auto mb-3" />
              <h3 className="text-3xl font-bold">{stats.skills}+</h3>
              <p className="text-gray-600 dark:text-gray-300">Technical Skills</p>
            </div>
            <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow">
              <FaLaptopCode className="text-4xl text-secondary mx-auto mb-3" />
              <h3 className="text-3xl font-bold">{stats.projects}+</h3>
              <p className="text-gray-600 dark:text-gray-300">Projects Completed</p>
            </div>
            <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow">
              <FaHeartbeat className="text-4xl text-accent mx-auto mb-3" />
              <h3 className="text-3xl font-bold">Health+Tech</h3>
              <p className="text-gray-600 dark:text-gray-300">Bridging Fields</p>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Preview */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">My Expertise</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-4 text-primary">Programming Skills</h3>
              <div className="flex flex-wrap gap-2">
                {['JavaScript', 'React', 'Node.js', 'Express', 'MongoDB', 'SQL', 'Python'].map(skill => (
                  <span key={skill} className="bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-4 text-secondary">Health Skills</h3>
              <div className="flex flex-wrap gap-2">
                {['Health Education', 'Community Health', 'Pharmacology Basics', 'OPD Worker'].map(skill => (
                  <span key={skill} className="bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;