import { Chat } from '@prisma/client';
import { UserEntity } from '../user/user.entity';

export type ChatEntity = Chat & Partial<{ UserInChat: { user: UserEntity }[] }>;
