import { IsEmail, IsString } from 'class-validator';

export class CreateChatDto {
  @IsString()
  topic: string;
  @IsEmail()
  userEmail: string;
  @IsString()
  userName: string;
}
