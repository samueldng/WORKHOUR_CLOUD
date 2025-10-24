import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('projects')
@UseGuards(JwtAuthGuard)
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get()
  findAll(@Request() req) {
    return this.projectsService.findAll(req.user.userId);
  }

  @Get(':id')
  findOne(@Request() req, @Param('id') id: string) {
    return this.projectsService.findOne(req.user.userId, parseInt(id));
  }

  @Post()
  create(@Request() req, @Body() createProjectDto: any) {
    return this.projectsService.create(req.user.userId, createProjectDto);
  }

  @Put(':id')
  update(@Request() req, @Param('id') id: string, @Body() updateProjectDto: any) {
    return this.projectsService.update(req.user.userId, parseInt(id), updateProjectDto);
  }

  @Delete(':id')
  remove(@Request() req, @Param('id') id: string) {
    return this.projectsService.remove(req.user.userId, parseInt(id));
  }
}