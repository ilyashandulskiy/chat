import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateAdminDto } from './dto/createAdmin.dto';

@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAll() {
    return await this.userService.getAll();
  }

  @Get('/:id')
  async get(@Param() { id }) {
    return await this.userService.get(id);
  }

  @Post('')
  async create(@Body() body: CreateAdminDto) {
    return await this.userService.createAdmin(body);
  }
}
