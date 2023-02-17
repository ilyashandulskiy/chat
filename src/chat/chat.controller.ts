import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateChatDto } from './dto/createChat.dto';
import { ChatService } from './chat.service';

@Controller('/chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post('')
  async create(@Body() body: CreateChatDto) {
    return await this.chatService.create(body);
  }

  @Get('')
  async getAll() {
    return await this.chatService.getAll();
  }
}
