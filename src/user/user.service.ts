import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserMapper } from './user.mapper';
import { UserEntity } from './user.entity';
import { CreateAdminDto } from './dto/createAdmin.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService, private userMapper: UserMapper) {}
  async createAdmin(dto: CreateAdminDto) {
    const entity = this.userMapper.createAdminToEntity(dto);

    await this.prisma.user.create({
      // @ts-ignore
      data: entity,
    });
  }

  async getAll() {
    const users: UserEntity[] = await this.prisma.user.findMany();

    return users.map(this.userMapper.entityToDto);
  }

  async get(id: string) {
    const user: UserEntity = await this.prisma.user.findFirst({
      where: { id },
    });

    return this.userMapper.entityToDto(user);
  }
}
