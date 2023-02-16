import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from '../prisma/prisma.service';
import { UserMapper } from './user.mapper';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService, PrismaService, UserMapper],
})
export class UserModule {}
