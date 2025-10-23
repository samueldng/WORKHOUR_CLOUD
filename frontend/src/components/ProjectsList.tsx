import React, { useState } from 'react';

interface Project {
  id: number;
  name: string;
  description: string;
  status: string;
  startDate: string;
  endDate: string;
  hourlyRate: number;
}

const ProjectsList: React.FC = () => {
  const [projects] = useState<Project[]>([
    {
      id: 1,
      name: 'Website Redesign',
      description: 'Redesign company website',
      status: 'active',
      startDate: '2025-01-01',
      endDate: '2025-03-31',
      hourlyRate: 50
    },
    {
      id: 2,
      name: 'Mobile App Development',
      description: 'Develop mobile application',
      status: 'planning',
      startDate: '2025-02-01',
      endDate: '2025-08-31',
      hourlyRate: 75
    }
  ]);

  return (
    <div className="projects-list">
      <h2>Projects</h2>
      <div className="projects-grid">
        {projects.map(project => (
          <div key={project.id} className="project-card">
            <h3>{project.name}</h3>
            <p>{project.description}</p>
            <div className="project-details">
              <span>Status: {project.status}</span>
              <span>Rate: ${project.hourlyRate}/hour</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsList;