import React from 'react';

interface Project {
  id: number;
  name: string;
  description: string;
  status: string;
  startDate: string;
  endDate: string;
  hourlyRate: number;
}

interface ProjectsListProps {
  projects: Project[];
}

const ProjectsList: React.FC<ProjectsListProps> = ({ projects }) => {
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