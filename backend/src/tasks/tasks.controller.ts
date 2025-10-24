import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('tasks')
@UseGuards(JwtAuthGuard)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  findAll(@Request() req) {
    return this.tasksService.findAll(req.user.userId);
  }

  @Get(':id')
  findOne(@Request() req, @Param('id') id: string) {
    return this.tasksService.findOne(req.user.userId, parseInt(id));
  }

  @Post()
  create(@Request() req, @Body() createTaskDto: any) {
    return this.tasksService.create(req.user.userId, createTaskDto);
  }

  @Put(':id')
  update(@Request() req, @Param('id') id: string, @Body() updateTaskDto: any) {
    return this.tasksService.update(req.user.userId, parseInt(id), updateTaskDto);
  }

  @Delete(':id')
  remove(@Request() req, @Param('id') id: string) {
    return this.tasksService.remove(req.user.userId, parseInt(id));
  }
}