import { Injectable } from '@nestjs/common';
import { MessageEntity } from './message.entity';
import { MessageDto } from './dto/message.dto';

@Injectable()
export class MessageMapper {
  entityToDto(entity: MessageEntity): MessageDto {
    return {
      id: entity?.id,
      fileUrl: entity?.fileUrl,
      content: entity?.content,
      fromUserId: entity.fromUserId,
      chatId: entity.chatId,
    };
  }
}
