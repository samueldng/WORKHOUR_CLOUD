import { Injectable } from '@nestjs/common';

@Injectable()
export class TimeTrackerService {
  private timeEntries: any[] = [];

  startTracking(startTimeDto: any) {
    const entry = {
      id: this.timeEntries.length + 1,
      userId: startTimeDto.userId,
      projectId: startTimeDto.projectId,
      taskId: startTimeDto.taskId,
      startTime: new Date(),
      endTime: null,
      duration: 0,
      status: 'active'
    };

    this.timeEntries.push(entry);
    return entry;
  }

  stopTracking(stopTimeDto: any) {
    const entry = this.timeEntries.find(e => e.id == stopTimeDto.entryId && e.status === 'active');
    if (entry) {
      entry.endTime = new Date();
      entry.duration = (entry.endTime.getTime() - entry.startTime.getTime()) / 1000; // in seconds
      entry.status = 'completed';
      return entry;
    }
    return null;
  }

  getTimeEntries() {
    return this.timeEntries;
  }

  getTimeEntry(id: string) {
    return this.timeEntries.find(e => e.id == id);
  }

  updateEntry(id: string, updateDto: any) {
    const index = this.timeEntries.findIndex(e => e.id == id);
    if (index !== -1) {
      this.timeEntries[index] = { ...this.timeEntries[index], ...updateDto };
      return this.timeEntries[index];
    }
    return null;
  }

  getSummary() {
    const totalEntries = this.timeEntries.length;
    const totalDuration = this.timeEntries.reduce((sum, entry) => sum + entry.duration, 0);
    const activeEntries = this.timeEntries.filter(e => e.status === 'active').length;
    
    return {
      totalEntries,
      totalDuration, // in seconds
      activeEntries,
      totalHours: totalDuration / 3600 // convert to hours
    };
  }
}