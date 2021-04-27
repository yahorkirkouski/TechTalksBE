import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MeetingsModule } from './modules/meetings/meetings.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/27017'),
    MeetingsModule,
  ],
})
export class AppModule {}
