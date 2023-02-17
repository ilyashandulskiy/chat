import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateChatDto } from './dto/createChat.dto';
import { UserEntity } from '../user/user.entity';
import { ChatEntity } from './chat.entity';
import { ChatMapper } from './chat.mapper';
import { ChatDto } from './dto/chat.dto';

@Injectable()
export class ChatService {
  constructor(private prisma: PrismaService, private chatMapper: ChatMapper) {}

  async getAll(): Promise<ChatDto[]> {
    const chats = await this.prisma.chat.findMany();
    return chats.map(this.chatMapper.entityToDto);
  }

  async create(dto: CreateChatDto): Promise<ChatDto> {
    const foundUser = await this.prisma.user.findFirst({
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

    const chat: ChatEntity = await this.prisma.chat.create({
      data: {
        topic: dto.topic,
        user_id: user.id,
        admin_id: simpleAdmin.id,
        status: 'new',
      },
    });

    return this.chatMapper.entityToDto(chat);
  }
}
