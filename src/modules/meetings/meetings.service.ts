import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Meeting } from './meetings.model';

@Injectable()
export class MeetingsService {
  constructor(
    @InjectModel('Meeting') private readonly meetingModel: Model<Meeting>,
  ) {}

  async insertMeeting(
    title: string,
    notes: string,
    description: string,
    dates: number[]
  ) {
    const newMeeting = new this.meetingModel({
      title,
      notes,
      description,
      dates,
    });
    const result = await newMeeting.save();
    return result;
  }

  async getMeetings() {
    const meetings = await this.meetingModel.find().exec();
    return meetings.map((meeting) => ({
      id: meeting.id,
      title: meeting.title,
      notes: meeting.notes,
      description: meeting.description,
      dates: meeting.dates,
    }));
  }

  async getSingleMeeting(meetingId: string) {
    const meeting = await this.findMeeting(meetingId);
    return {
      id: meeting.id,
      title: meeting.title,
      notes: meeting.notes,
      description: meeting.description,
      dates: meeting.dates,
    };
  }

  async updateMeeting(
    meetingId: string,
    title: string,
    notes: string,
    description: string,
    dates: Array<Intl.DateTimeFormatOptions>,
  ) {
    const updatedMeeting = await this.findMeeting(meetingId);
    if (title) {
      updatedMeeting.title = title;
    }
    if (notes) {
      updatedMeeting.notes = notes;
    }
    if (description) {
      updatedMeeting.description = description;
    }
    if (dates) {
      updatedMeeting.dates = dates;
    }
    updatedMeeting.save();
    return updatedMeeting;
  }

  async deleteMeeting(meetingId: string) {
    const result = await this.meetingModel.deleteOne({ _id: meetingId }).exec();
    if (result.n === 0) {
      throw new NotFoundException('Could not find meeting.');
    }
    return true;
  }

  private async findMeeting(id: string): Promise<Meeting> {
    let meeting;
    try {
      meeting = await this.meetingModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Could not find meeting.');
    }
    if (!meeting) {
      throw new NotFoundException('Could not find meeting.');
    }
    return meeting;
  }
}
