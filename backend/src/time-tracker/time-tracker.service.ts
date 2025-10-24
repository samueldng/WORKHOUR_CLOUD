import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TimeTrackerService {
  constructor(private prisma: PrismaService) {}

  async startTracking(userId: number, startTimeDto: any) {
    const entry = await this.prisma.timeEntry.create({
      data: {
        userId,
        projectId: startTimeDto.projectId,
        taskId: startTimeDto.taskId,
        startTime: new Date(),
        status: 'active'
      }
    });
    return entry;
  }

  async stopTracking(userId: number, entryId: number) {
    const entry = await this.prisma.timeEntry.findFirst({
      where: {
        id: entryId,
        userId: userId,
        status: 'active'
      }
    });

    if (entry) {
      const endTime = new Date();
      const duration = Math.floor((endTime.getTime() - entry.startTime.getTime()) / 1000);
      
      const updatedEntry = await this.prisma.timeEntry.update({
        where: { id: entryId },
        data: {
          endTime: endTime,
          duration: duration,
          status: 'completed'
        }
      });
      
      return updatedEntry;
    }
    return null;
  }

  async getTimeEntries(userId: number) {
    return this.prisma.timeEntry.findMany({
      where: { userId: userId },
      orderBy: { startTime: 'desc' }
    });
  }

  async getTimeEntry(userId: number, id: number) {
    return this.prisma.timeEntry.findFirst({
      where: { id: id, userId: userId }
    });
  }

  async updateEntry(userId: number, id: number, updateDto: any) {
    return this.prisma.timeEntry.update({
      where: { id: id, userId: userId },
      data: updateDto
    });
  }

  async getSummary(userId: number) {
    const entries = await this.prisma.timeEntry.findMany({
      where: { userId: userId }
    });
    
    const totalEntries = entries.length;
    const totalDuration = entries.reduce((sum, entry) => sum + entry.duration, 0);
    const activeEntries = entries.filter(e => e.status === 'active').length;
    
    return {
      totalEntries,
      totalDuration, // in seconds
      activeEntries,
      totalHours: totalDuration / 3600 // convert to hours
    };
  }
}