import React from 'react';

// Static data for About section
const aboutData = {
  bio: "I'm Omer Abdulshafi, a passionate Full Stack Developer with a strong background in healthcare and public health. I create innovative digital solutions that bridge the gap between technology and healthcare, focusing on building applications that improve lives and streamline healthcare processes.",
  education: [
    {
      degree: "Bachelor of Science in Public Health",
      institution: "University of Health Sciences",
      year: "2020 - 2024",
      description: "Specialized in Health Informatics and Digital Health Solutions"
    },
    {
      degree: "Full Stack Web Development Bootcamp",
      institution: "Tech Training Institute",
      year: "2023",
      description: "Comprehensive training in MERN Stack and modern web development practices"
    }
  ],
  experience: [
    {
      title: "Full Stack Developer",
      company: "Tech Solutions Co.",
      period: "2023 - Present",
      description: "Developing web applications using React, Node.js, and MongoDB. Working on healthcare management systems."
    },
    {
      title: "Junior Web Developer",
      company: "Digital Agency",
      period: "2022 - 2023",
      description: "Built responsive websites and web applications for various clients using React and vanilla JavaScript."
    },
    {
      title: "Health IT Intern",
      company: "Medical Center",
      period: "2021 - 2022",
      description: "Assisted in the development of health information systems and patient management software."
    }
  ],
  contactInfo: {
    email: "omarabdulshafa8gmail.com",
    location: "Kigali, Rwanda",
    github: "https://github.com/Omerabdulshafi",
    linkedin: "https://www.linkedin.com/in/omer-abdulshafi-a689672a8/"
  }
};

const About = () => {
  const about = aboutData;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-black text-white py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-5xl font-bold mb-12">About Me</h1>
        
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
      </div>
    </div>
  );
};

export default About;
