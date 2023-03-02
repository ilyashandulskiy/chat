import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { ChatMapper } from './chat.mapper';
import { MessageModule } from '../message/message.module';
import { MessageService } from '../message/message.service';
import { MessageMapper } from '../message/message.mapper';

@Module({
  imports: [MessageModule],
  controllers: [ChatController],
  providers: [
    ChatService,
    PrismaService,
    ChatMapper,
    MessageService,
    MessageMapper,
  ],
})
export class ChatModule {}
