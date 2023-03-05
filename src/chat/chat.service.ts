import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateChatDto } from './dto/createChat.dto';
import { UserEntity } from '../user/user.entity';
import { MessageService } from '../message/message.service';
import { PrismaService } from '../prisma/prisma.service';
import { ChatMapper } from './chat.mapper';
import { ChatDto } from './dto/chat.dto';
import constants from './constants';
import { CreatedChatDto } from './dto/createdChat.dto';
import { FinishChatDto } from './dto/finishChat.dto';

@Injectable()
export class ChatService {
  constructor(
    private messageService: MessageService,
    private mapper: ChatMapper,
    private prisma: PrismaService,
  ) {}

  async getAll(): Promise<ChatDto[]> {
    const chats = await this.prisma.chat.findMany({
      where: {},
      include: constants.PRISMA.CHAT_INCLUDE_USERS,
    });
    return chats.map(this.mapper.entityToDto);
  }

  async getById(id: string): Promise<ChatDto> {
    const chat = await this.prisma.chat.findUnique({
      where: { id },
      include: constants.PRISMA.CHAT_INCLUDE_USERS,
    });
    if (!chat) throw new NotFoundException();
    return this.mapper.entityToDto(chat);
  }

  async finish(chatId: string, dto: FinishChatDto): Promise<void> {
    await this.prisma.chat.update({
      where: { id: chatId },
      data: { status: 'finished', rating: dto.rate },
    });
  }

  async create(dto: CreateChatDto): Promise<CreatedChatDto> {
    const foundUser = await this.prisma.user.findUnique({
      where: { email: dto.userEmail },
    });
    let user: UserEntity;

    if (foundUser) {
      user = foundUser;
    } else {
      user = await this.prisma.user.create({
        data: {
          email: dto.userEmail,
          name: dto.userName,
          role: 'customer',
        },
      });
    }

    const simpleAdmin = await this.prisma.user.findFirst({
      where: { role: 'admin' },
    });

    if (!simpleAdmin)
      throw new HttpException('Chat cannot be created without admins', 500);

    const chat = await this.prisma.chat.create({
      data: {
        topic: dto.topic,
        status: 'new',
      },
    });

    await this.prisma.userInChat.create({
      data: {
        userId: simpleAdmin.id,
        chatId: chat.id,
      },
    });

    await this.prisma.userInChat.create({
      data: {
        userId: user.id,
        chatId: chat.id,
      },
    });

    await this.messageService.create({
      content: dto.topic,
      fromUserId: user.id,
      chatId: chat.id,
    });

    const updatedChat = await this.prisma.chat.findUnique({
      where: { id: chat.id },
      include: constants.PRISMA.CHAT_INCLUDE_USERS,
    });

    return {
      user: {
        id: user.id,
      },
      chat: this.mapper.entityToDto(updatedChat),
    };
  }
}
