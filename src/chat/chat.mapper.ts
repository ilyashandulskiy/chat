import { Injectable } from '@nestjs/common';
import { ChatEntity } from './chat.entity';
import { ChatDto } from './dto/chat.dto';

@Injectable()
export class ChatMapper {
  entityToDto(entity: ChatEntity): ChatDto {
    return {
      id: entity.id,
      status: entity.status,
      topic: entity.topic,
      user: entity.UserInChat?.map(({ user }) => ({
        id: user.id,
        name: user.name,
        role: user.role,
        email: user.email,
        avatarFile: user.avatarFile,
      })),
    };
  }
}
