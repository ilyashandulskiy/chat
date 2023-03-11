import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateChatDto } from './dto/createChat.dto';
import { ChatService } from './chat.service';
import { ChatDto } from './dto/chat.dto';
import { CreatedChatDto } from './dto/createdChat.dto';
import { FinishChatDto } from './dto/finishChat.dto';

@Controller('/chat')
export class ChatController {
  constructor(private readonly service: ChatService) {}

  @Post('')
  async create(@Body() body: CreateChatDto): Promise<CreatedChatDto> {
    return await this.service.create(body);
  }

  @Get('/:chatId')
  async get(@Param('chatId') id: string): Promise<ChatDto> {
    return await this.service.getById(id);
  }

  @Post('/:chatId/finish')
  async finish(
    @Param('chatId') id: string,
    @Body() body: FinishChatDto,
  ): Promise<void> {
    return await this.service.finish(id, body);
  }

  @Get('')
  async getAll(): Promise<ChatDto[]> {
    return await this.service.getAll();
  }
}
