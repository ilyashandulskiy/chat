import { Injectable } from '@nestjs/common';
import { MessageEntity } from './message.entity';
import { MessageDto } from './dto/message.dto';
import { CreateMessageDto } from './dto/createMessage.dto';

@Injectable()
export class MessageMapper {
  dtoToEntity(dto: CreateMessageDto): MessageEntity {
    return new MessageEntity({
      file_url: dto?.fileUrl,
      content: dto?.content,
      from_user_id: dto.fromUserId,
    });
  }

  entityToDto(entity: MessageEntity): MessageDto {
    return {
      fileUrl: entity?.file_url,
      content: entity?.content,
      fromUserId: entity.from_user_id,
      chatId: entity.chat_id,
    };
  }
}
