import { Injectable } from '@nestjs/common';
import { UserEntity } from './user.entity';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserMapper {
  entityToDto(entity: UserEntity): UserDto {
    return {
      id: entity.id,
      email: entity.email,
      role: entity.role,
      name: entity.name,
      avatarUrl: entity.avatarUrl,
    };
  }
}
