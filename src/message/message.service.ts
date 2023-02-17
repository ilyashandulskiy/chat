import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMessageDto } from './dto/createMessage.dto';
import { MessageMapper } from './message.mapper';
import { MessageDto } from './dto/message.dto';

@Injectable()
export class MessageService {
  constructor(
    private prisma: PrismaService,
    private messageMapper: MessageMapper,
  ) {}

  async create(dto: CreateMessageDto, chatId: string): Promise<MessageDto> {
    const message = await this.prisma.message.create({
      data: {
        from_user_id: dto.fromUserId,
        content: dto?.content,
        file_url: dto?.fileUrl,
        chat_id: chatId,
      },
    });
    return this.messageMapper.entityToDto(message);
  }

  async getAll(chatId: string): Promise<MessageDto[]> {
    const messages = await this.prisma.message.findMany({
      where: { chat_id: chatId },
    });

    return messages.map(this.messageMapper.entityToDto);
  }
}
