import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async findAll(userId: number) {
    return this.prisma.task.findMany({
      where: {
        project: {
          userId: userId
        }
      }
    });
  }

  async findOne(userId: number, id: number) {
    return this.prisma.task.findFirst({
      where: {
        id: id,
        project: {
          userId: userId
        }
      }
    });
  }

  async create(userId: number, createTaskDto: any) {
    // First verify that the project belongs to the user
    const project = await this.prisma.project.findFirst({
      where: {
        id: createTaskDto.projectId,
        userId: userId
      }
    });

    if (!project) {
      throw new Error('Project not found or does not belong to user');
    }

    return this.prisma.task.create({
      data: createTaskDto
    });
  }

  async update(userId: number, id: number, updateTaskDto: any) {
    // First verify that the task belongs to a project that belongs to the user
    const task = await this.prisma.task.findFirst({
      where: {
        id: id,
        project: {
          userId: userId
        }
      }
    });

    if (!task) {
      throw new Error('Task not found or does not belong to user');
    }

    return this.prisma.task.update({
      where: { id: id },
      data: updateTaskDto
    });
  }

  async remove(userId: number, id: number) {
    // First verify that the task belongs to a project that belongs to the user
    const task = await this.prisma.task.findFirst({
      where: {
        id: id,
        project: {
          userId: userId
        }
      }
    });

    if (!task) {
      throw new Error('Task not found or does not belong to user');
    }

    return this.prisma.task.delete({
      where: { id: id }
    });
  }
}