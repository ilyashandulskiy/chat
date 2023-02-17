import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { ChatMapper } from './chat.mapper';

@Module({
  imports: [],
  controllers: [ChatController],
  providers: [ChatService, PrismaService, ChatMapper],
})
export class ChatModule {}
