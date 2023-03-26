import { FileDto } from '../../file/dto/file.dto';

export class MessageDto {
  id?: string;
  chatId: string;
  fromUserId: string;
  content?: string;
  file?: FileDto;
  createdAt: Date;
}
