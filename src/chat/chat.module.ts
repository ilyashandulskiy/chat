import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { MessageModule } from '../message/message.module';
import { MessageService } from '../message/message.service';
import { MessageMapper } from '../message/message.mapper';
import { ChatMapper } from './chat.mapper';

@Module({
  imports: [MessageModule],
  controllers: [ChatController],
  providers: [
    ChatService,
    PrismaService,
    MessageService,
    MessageMapper,
    ChatMapper,
  ],
})
export class ChatModule {}
