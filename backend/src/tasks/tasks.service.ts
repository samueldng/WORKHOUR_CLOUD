import { Injectable } from '@nestjs/common';

@Injectable()
export class TasksService {
  private tasks: any[] = [
    {
      id: 1,
      projectId: 1,
      name: 'Design Homepage',
      description: 'Create wireframes for homepage',
      status: 'todo',
      assignee: 'john@example.com',
      dueDate: '2025-01-15'
    },
    {
      id: 2,
      projectId: 1,
      name: 'Implement Header',
      description: 'Code the website header',
      status: 'doing',
      assignee: 'jane@example.com',
      dueDate: '2025-01-20'
    }
  ];

  findAll() {
    return this.tasks;
  }

  findOne(id: string) {
    return this.tasks.find(task => task.id == id);
  }

  create(createTaskDto: any) {
    const newTask = {
      id: this.tasks.length + 1,
      ...createTaskDto
    };
    this.tasks.push(newTask);
    return newTask;
  }

  update(id: string, updateTaskDto: any) {
    const index = this.tasks.findIndex(task => task.id == id);
    if (index !== -1) {
      this.tasks[index] = { ...this.tasks[index], ...updateTaskDto };
      return this.tasks[index];
    }
    return null;
  }

  remove(id: string) {
    const index = this.tasks.findIndex(task => task.id == id);
    if (index !== -1) {
      const deletedTask = this.tasks[index];
      this.tasks.splice(index, 1);
      return deletedTask;
    }
    return null;
  }
}