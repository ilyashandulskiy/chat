import { User } from '@prisma/client';
import { FileEntity } from '../file/file.entity';

export type UserEntity = User & Partial<{ avatarFile: FileEntity }>;
