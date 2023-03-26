import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserMapper } from './user.mapper';
import { UserEntity } from './user.entity';
import { CreateAdminDto } from './dto/createAdmin.dto';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService, private userMapper: UserMapper) {}

  async createAdmin(dto: CreateAdminDto): Promise<UserDto> {
    const created = await this.prisma.user.create({
      data: {
        ...dto,
        role: 'admin',
      },
      include: { avatarFile: true },
    });
    return this.userMapper.entityToDto(created);
  }

  async update(id: string, dto: Partial<CreateAdminDto>): Promise<UserDto> {
    const created = await this.prisma.user.update({
      where: { id },
      data: {
        ...dto,
        role: 'admin',
      },
      include: { avatarFile: true },
    });
    return this.userMapper.entityToDto(created);
  }

  async getAll(): Promise<UserDto[]> {
    const users: UserEntity[] = await this.prisma.user.findMany({
      include: { avatarFile: true },
    });

    return users.map(this.userMapper.entityToDto);
  }

  async get(id: string): Promise<UserDto> {
    const user: UserEntity = await this.prisma.user.findFirst({
      where: { id },
      include: { avatarFile: true },
    });

    if (!user) throw new NotFoundException();
    return this.userMapper.entityToDto(user);
  }
}
