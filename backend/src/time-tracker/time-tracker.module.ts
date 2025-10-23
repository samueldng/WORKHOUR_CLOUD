import { Module } from '@nestjs/common';
import { TimeTrackerController } from './time-tracker.controller';
import { TimeTrackerService } from './time-tracker.service';

@Module({
  imports: [],
  controllers: [TimeTrackerController],
  providers: [TimeTrackerService],
  exports: [TimeTrackerService],
})
export class TimeTrackerModule {}