import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  imports: [],
  providers: [EventsService, PrismaService, PrismaService],
})
export class EventsModule {}
