export class UserEntity {
  id: string;
  name: string;
  email: string;
  password?: string;
  avatar_url?: string;
  role: string;

  created_at?: Date;
  updated_at?: Date;

  constructor(fields: Partial<UserEntity>) {
    Object.assign(this, fields);
  }
}
