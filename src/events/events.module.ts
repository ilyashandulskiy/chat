import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { MessageModule } from '../message/message.module';
import { MessageService } from '../message/message.service';
import { PrismaService } from '../prisma/prisma.service';
import { MessageMapper } from '../message/message.mapper';

@Module({
  imports: [MessageModule],
  providers: [EventsService, MessageService, PrismaService, MessageMapper],
})
export class EventsModule {}
