import { Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/createAdmin.dto';
import { UserEntity } from './user.entity';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserMapper {
  createAdminToEntity(dto: CreateAdminDto): UserEntity {
    return new UserEntity({
      ...dto,
      role: 'admin',
    });
  }

  dtoToEntity(dto: UserDto): UserEntity {
    return new UserEntity({
      ...dto,
      avatar_url: dto.avatarUrl,
    });
  }

  entityToDto(entity: UserEntity): UserDto {
    return {
      ...entity,
      avatarUrl: entity.avatar_url,
    };
  }
}
