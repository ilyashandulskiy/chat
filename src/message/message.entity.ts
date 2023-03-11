import { File, Message } from '@prisma/client';

export type MessageEntity = Message & Partial<{ file: File }>;
