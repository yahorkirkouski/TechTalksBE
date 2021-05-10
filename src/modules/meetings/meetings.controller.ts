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
import { Participants } from './meetings.model';

@Controller('api/meetings')
export class MeetingsController {
  constructor(private readonly meetingsService: MeetingsService) {}

  @Post()
  async addMeeting(
    @Body('title') meetingTitle: string,
    @Body('notes') meetingNotes: string,
    @Body('description') meetingDesc: string,
    @Body('dates') meetingDates: number[],
    @Body('participants') meetingParticipants: Participants[],
  ) {
    const meeting = await this.meetingsService.insertMeeting(
      meetingTitle,
      meetingNotes,
      meetingDesc,
      meetingDates,
      meetingParticipants,
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
    return JSON.stringify(meetings);
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
    @Body('dates') meetingDates: Array<string>,
    @Body('participants') meetingParticipants: Participants[],
  ) {
    const meeting = await this.meetingsService.updateMeeting(
      meetingId,
      meetingTitle,
      meetingNotes,
      meetingDesc,
      meetingDates,
      meetingParticipants,
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
