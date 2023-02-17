import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateMessageDto } from './dto/createMessage.dto';
import { MessageService } from './message.service';

@Controller('/message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post('/:chatId')
  async create(
    @Body() body: CreateMessageDto,
    @Param('chatId') chatId: string,
  ) {
    return await this.messageService.create(body, chatId);
  }

  @Get('/:chatId')
  async getAll(@Param('chatId') chatId: string) {
    return await this.messageService.getAll(chatId);
  }
}
