import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  HttpStatus,
} from '@nestjs/common';

import { MeetingsService } from './meetings.service';

@Controller('api/meetings')
export class MeetingsController {
  constructor(private readonly meetingsService: MeetingsService) {}

  @Post()
  async addMeeting(
    @Body('title') meetingTitle: string,
    @Body('notes') meetingNotes: string,
    @Body('description') meetingDesc: string,
    @Body('dates') meetingDates: number[],
  ) {
    const meeting = await this.meetingsService.insertMeeting(
      meetingTitle,
      meetingNotes,
      meetingDesc,
      meetingDates,
    );
    return {
      statusCode: HttpStatus.OK,
      message: 'Meeting added successfully',
      data: meeting,
    };
  }

  @Get()
  async getAllMeetings() {
    const meetings = await this.meetingsService.getMeetings();
    return meetings;
  }

  @Get(':id')
  getMeeting(@Param('id') meetingId: string) {
    return this.meetingsService.getSingleMeeting(meetingId);
  }

  @Patch(':id')
  async updateMeeting(
    @Param('id') meetingId: string,
    @Body('title') meetingTitle: string,
    @Body('notes') meetingNotes: string,
    @Body('description') meetingDesc: string,
    @Body('dates') meetingDates: Array<number>,
  ) {
    const meeting = await this.meetingsService.updateMeeting(
      meetingId,
      meetingTitle,
      meetingNotes,
      meetingDesc,
      meetingDates,
    );
    return {
      statusCode: HttpStatus.OK,
      message: 'Meeting updated successfully',
      meeting: meeting,
    };
  }

  @Delete(':id')
  async removeMeeting(@Param('id') meetingId: string) {
    const isDeleted = await this.meetingsService.deleteMeeting(meetingId);
    if (isDeleted) {
      return {
        statusCode: HttpStatus.OK,
        message: 'Meeting deleted successfully',
      };
    }
  }
}
