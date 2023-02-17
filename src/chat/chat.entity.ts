export class ChatEntity {
  id: string;
  user_id: string;
  admin_id: string;
  topic: string;
  rating?: number;
  status: string;

  created_at?: Date;
  updated_at?: Date;

  constructor(fields: Partial<ChatEntity>) {
    Object.assign(this, fields);
  }
}
