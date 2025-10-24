import { Controller, Post, Body, Get, Param, Put, UseGuards, Request } from '@nestjs/common';
import { TimeTrackerService } from './time-tracker.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('time')
@UseGuards(JwtAuthGuard)
export class TimeTrackerController {
  constructor(private readonly timeTrackerService: TimeTrackerService) {}

  @Post('start')
  startTracking(@Request() req, @Body() startTimeDto: any) {
    return this.timeTrackerService.startTracking(req.user.userId, startTimeDto);
  }

  @Post('stop')
  stopTracking(@Request() req, @Body() stopTimeDto: any) {
    return this.timeTrackerService.stopTracking(req.user.userId, stopTimeDto.entryId);
  }

  @Get('entries')
  getTimeEntries(@Request() req) {
    return this.timeTrackerService.getTimeEntries(req.user.userId);
  }

  @Get('summary')
  getSummary(@Request() req) {
    return this.timeTrackerService.getSummary(req.user.userId);
  }

  @Get('entries/:id')
  getTimeEntry(@Request() req, @Param('id') id: string) {
    return this.timeTrackerService.getTimeEntry(req.user.userId, parseInt(id));
  }

  @Put('entries/:id')
  updateEntry(@Request() req, @Param('id') id: string, @Body() updateDto: any) {
    return this.timeTrackerService.updateEntry(req.user.userId, parseInt(id), updateDto);
  }
}