import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMessageDto } from './dto/createMessage.dto';
import { MessageMapper } from './message.mapper';
import { MessageDto } from './dto/message.dto';

@Injectable()
export class MessageService {
  constructor(private prisma: PrismaService, private mapper: MessageMapper) {}

  async create(dto: CreateMessageDto): Promise<MessageDto> {
    const chat = await this.prisma.chat.findUnique({
      where: { id: dto.chatId },
    });
    if (chat.status === 'finished')
      throw new HttpException('Chat is already finished', 404);

    const message = await this.prisma.message.create({
      data: {
        fromUserId: dto.fromUserId,
        content: dto?.content,
        fileId: dto?.fileId,
        chatId: dto.chatId,
      },
    });
    return this.mapper.entityToDto(message);
  }

  async getAll(chatId: string): Promise<MessageDto[]> {
    const messages = await this.prisma.message.findMany({
      where: { chatId: chatId },
      include: { file: true },
    });

    return messages.map(this.mapper.entityToDto);
  }
}
