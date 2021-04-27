import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { MeetingsController } from './meetings.controller';
import { MeetingsService } from './meetings.service';
import { MeetingsSchema } from './meetings.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Meeting', schema: MeetingsSchema }]),
  ],
  controllers: [MeetingsController],
  providers: [MeetingsService],
})
export class MeetingsModule {}
