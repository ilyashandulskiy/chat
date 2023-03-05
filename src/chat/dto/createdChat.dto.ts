import { ChatDto } from './chat.dto';

export class CreatedChatDto {
  user: {
    id: string;
  };
  chat: ChatDto;
}
