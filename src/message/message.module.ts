import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';
import { MessageMapper } from './message.mapper';

@Module({
  imports: [],
  controllers: [MessageController],
  providers: [MessageService, PrismaService, MessageMapper],
})
export class MessageModule {}
