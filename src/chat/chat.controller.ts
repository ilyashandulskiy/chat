import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateChatDto } from './dto/createChat.dto';
import { ChatService } from './chat.service';

@Controller('/chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post('')
  async create(@Body() body: CreateChatDto) {
    return await this.chatService.create(body);
  }

  @Get('/:chatId')
  async get(@Param('chatId') id: string) {
    return await this.chatService.getById(id);
  }

  @Get('')
  async getAll() {
    return await this.chatService.getAll();
  }
}
