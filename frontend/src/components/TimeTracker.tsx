import React, { useState } from 'react';

interface TimeEntry {
  id: number;
  projectId: number;
  taskId: number;
  startTime: Date;
  endTime: Date | null;
  duration: number;
  status: 'active' | 'completed';
}

const TimeTracker: React.FC = () => {
  const [isTracking, setIsTracking] = useState(false);
  const [currentEntry, setCurrentEntry] = useState<TimeEntry | null>(null);
  const [timeEntries, setTimeEntries] = useState<TimeEntry[]>([]);

  const startTracking = () => {
    const newEntry: TimeEntry = {
      id: Date.now(),
      projectId: 1,
      taskId: 1,
      startTime: new Date(),
      endTime: null,
      duration: 0,
      status: 'active'
    };
    
    setCurrentEntry(newEntry);
    setIsTracking(true);
    setTimeEntries([...timeEntries, newEntry]);
  };

  const stopTracking = () => {
    if (currentEntry) {
      const updatedEntry = {
        ...currentEntry,
        endTime: new Date(),
        duration: (new Date().getTime() - currentEntry.startTime.getTime()) / 1000,
        status: 'completed' as const
      };
      
      setCurrentEntry(null);
      setIsTracking(false);
      
      setTimeEntries(timeEntries.map(entry => 
        entry.id === currentEntry.id ? updatedEntry : entry
      ));
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
              {entry.startTime.toLocaleString()} - 
              {entry.endTime ? entry.endTime.toLocaleString() : 'Active'}
              ({(entry.duration / 3600).toFixed(2)} hours)
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TimeTracker;