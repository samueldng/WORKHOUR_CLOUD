import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProjectsService {
  constructor(private prisma: PrismaService) {}

  async findAll(userId: number) {
    return this.prisma.project.findMany({
      where: { userId: userId }
    });
  }

  async findOne(userId: number, id: number) {
    return this.prisma.project.findFirst({
      where: { id: id, userId: userId }
    });
  }

  async create(userId: number, createProjectDto: any) {
    return this.prisma.project.create({
      data: {
        ...createProjectDto,
        userId: userId
      }
    });
  }

  async update(userId: number, id: number, updateProjectDto: any) {
    return this.prisma.project.update({
      where: { id: id, userId: userId },
      data: updateProjectDto
    });
  }

  async remove(userId: number, id: number) {
    return this.prisma.project.delete({
      where: { id: id, userId: userId }
    });
  }
}