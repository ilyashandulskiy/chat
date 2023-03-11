import { FileDto } from '../../file/dto/file.dto';

export class UserDto {
  id: string;
  email: string;
  name: string;
  role: string;
  avatarFile?: FileDto;
}
