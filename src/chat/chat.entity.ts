import { Chat, User } from '@prisma/client';

export type ChatEntity = Chat & Partial<{ UserInChat: { user: User }[] }>;
