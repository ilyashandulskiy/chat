import { UserDto } from '../../user/dto/user.dto';

export class ChatDto {
  id: string;
  user: UserDto[];
  topic: string;
  rating?: number;
  status: string;
}
