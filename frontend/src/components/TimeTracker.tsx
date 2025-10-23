import React, { useState, useEffect } from 'react';
import api from '../services/api';

interface TimeEntry {
  id: number;
  projectId: number;
  taskId: number;
  startTime: string;
  endTime: string | null;
  duration: number;
  status: 'active' | 'completed';
}

const TimeTracker: React.FC = () => {
  const [isTracking, setIsTracking] = useState(false);
  const [currentEntry, setCurrentEntry] = useState<TimeEntry | null>(null);
  const [timeEntries, setTimeEntries] = useState<TimeEntry[]>([]);

  useEffect(() => {
    const fetchTimeEntries = async () => {
      try {
        const entries = await api.getTimeEntries();
        setTimeEntries(entries);
      } catch (error) {
        console.error('Error fetching time entries:', error);
      }
    };

    fetchTimeEntries();
  }, []);

  const startTracking = async () => {
    try {
      // For now, we'll use a default project and task ID
      const newEntry = await api.startTimeEntry({ projectId: 1, taskId: 1 });
      setCurrentEntry(newEntry);
      setIsTracking(true);
      setTimeEntries([...timeEntries, newEntry]);
    } catch (error) {
      console.error('Error starting time tracking:', error);
    }
  };

  const stopTracking = async () => {
    if (currentEntry) {
      try {
        const updatedEntry = await api.stopTimeEntry(currentEntry.id);
        setCurrentEntry(null);
        setIsTracking(false);
        
        setTimeEntries(timeEntries.map(entry => 
          entry.id === currentEntry.id ? updatedEntry : entry
        ));
      } catch (error) {
        console.error('Error stopping time tracking:', error);
      }
    }
  };

  const totalHours = timeEntries.reduce((sum, entry) => sum + entry.duration, 0) / 3600;

  return (
    <div className="time-tracker">
      <h2>Time Tracker</h2>
      <div className="tracking-controls">
        {!isTracking ? (
          <button onClick={startTracking}>Start Tracking</button>
        ) : (
          <button onClick={stopTracking}>Stop Tracking</button>
        )}
      </div>
      
      <div className="time-summary">
        <h3>Total Hours: {totalHours.toFixed(2)}</h3>
      </div>
      
      <div className="time-entries">
        <h3>Time Entries</h3>
        <ul>
          {timeEntries.map(entry => (
            <li key={entry.id}>
              {new Date(entry.startTime).toLocaleString()} - 
              {entry.endTime ? new Date(entry.endTime).toLocaleString() : 'Active'}
              ({(entry.duration / 3600).toFixed(2)} hours)
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TimeTracker;