import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateAdminDto } from './dto/createAdmin.dto';
import { UserDto } from './dto/user.dto';

@Controller('/user')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Get()
  async getAll(): Promise<UserDto[]> {
    return await this.service.getAll();
  }

  @Get('/:id')
  async get(@Param() { id }): Promise<UserDto> {
    return await this.service.get(id);
  }

  @Post('')
  async create(@Body() body: CreateAdminDto): Promise<UserDto> {
    return await this.service.createAdmin(body);
  }

  @Post('/:id')
  async update(
    @Body() body: Partial<CreateAdminDto>,
    @Param('id') id: string,
  ): Promise<UserDto> {
    return await this.service.update(id, body);
  }
}
