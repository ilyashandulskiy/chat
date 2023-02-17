export class MessageEntity {
  id: string;
  chat_id: string;
  from_user_id: string;
  content?: string;
  file_url?: string;

  created_at?: Date;
  updated_at?: Date;

  constructor(fields: Partial<MessageEntity>) {
    Object.assign(this, fields);
  }
}
