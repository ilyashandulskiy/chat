import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateAdminDto } from './dto/createAdmin.dto';
import { UserDto } from './dto/user.dto';

@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAll(): Promise<UserDto[]> {
    return await this.userService.getAll();
  }

  @Get('/:id')
  async get(@Param() { id }): Promise<UserDto> {
    return await this.userService.get(id);
  }

  @Post('')
  async create(@Body() body: CreateAdminDto): Promise<UserDto> {
    return await this.userService.createAdmin(body);
  }
}
