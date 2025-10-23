import React from 'react';
import TimeTracker from './TimeTracker';
import ProjectsList from './ProjectsList';

const Dashboard: React.FC = () => {
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
          <ProjectsList />
        </section>
      </main>
    </div>
  );
};

export default Dashboard;