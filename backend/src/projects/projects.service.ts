import { Injectable } from '@nestjs/common';

@Injectable()
export class ProjectsService {
  private projects: any[] = [
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
  ];

  findAll() {
    return this.projects;
  }

  findOne(id: string) {
    return this.projects.find(project => project.id == id);
  }

  create(createProjectDto: any) {
    const newProject = {
      id: this.projects.length + 1,
      ...createProjectDto
    };
    this.projects.push(newProject);
    return newProject;
  }

  update(id: string, updateProjectDto: any) {
    const index = this.projects.findIndex(project => project.id == id);
    if (index !== -1) {
      this.projects[index] = { ...this.projects[index], ...updateProjectDto };
      return this.projects[index];
    }
    return null;
  }

  remove(id: string) {
    const index = this.projects.findIndex(project => project.id == id);
    if (index !== -1) {
      const deletedProject = this.projects[index];
      this.projects.splice(index, 1);
      return deletedProject;
    }
    return null;
  }
}