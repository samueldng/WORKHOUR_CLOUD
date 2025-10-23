import { Controller, Post, Body, Get, Param, Put, UseGuards } from '@nestjs/common';
import { TimeTrackerService } from './time-tracker.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('time')
@UseGuards(JwtAuthGuard)
export class TimeTrackerController {
  constructor(private readonly timeTrackerService: TimeTrackerService) {}

  @Post('start')
  startTracking(@Body() startTimeDto: any) {
    return this.timeTrackerService.startTracking(startTimeDto);
  }

  @Post('stop')
  stopTracking(@Body() stopTimeDto: any) {
    return this.timeTrackerService.stopTracking(stopTimeDto);
  }

  @Get('entries')
  getTimeEntries() {
    return this.timeTrackerService.getTimeEntries();
  }

  @Get('summary')
  getSummary() {
    return this.timeTrackerService.getSummary();
  }

  @Get('entries/:id')
  getTimeEntry(@Param('id') id: string) {
    return this.timeTrackerService.getTimeEntry(id);
  }

  @Put('entries/:id')
  updateEntry(@Param('id') id: string, @Body() updateDto: any) {
    return this.timeTrackerService.updateEntry(id, updateDto);
  }
}