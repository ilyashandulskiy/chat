import { Injectable } from '@nestjs/common';
import { ChatEntity } from './chat.entity';
import { ChatDto } from './dto/chat.dto';

@Injectable()
export class ChatMapper {
  entityToDto(entity: ChatEntity): ChatDto {
    return {
      id: entity.id,
      userId: entity.user_id,
      adminId: entity.admin_id,
      rating: entity?.rating,
      topic: entity.topic,
      status: entity.status,
    };
  }
}
