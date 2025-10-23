import React, { useState, useEffect } from 'react';
import TimeTracker from './TimeTracker';
import ProjectsList from './ProjectsList';
import api from '../services/api';

const Dashboard: React.FC = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projectsData = await api.getProjects();
        setProjects(projectsData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching projects:', error);
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="dashboard">
      <header>
        <h1>Workhour Cloud Dashboard</h1>
      </header>
      
      <main>
        <section className="time-tracking-section">
          <TimeTracker />
        </section>
        
        <section className="projects-section">
          <ProjectsList projects={projects} />
        </section>
      </main>
    </div>
  );
};

export default Dashboard;