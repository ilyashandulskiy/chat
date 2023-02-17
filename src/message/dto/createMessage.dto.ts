import { IsString } from 'class-validator';

export class CreateMessageDto {
  @IsString()
  fromUserId: string;
  content?: string;
  fileUrl?: string;
}
