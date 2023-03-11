import * as crypto from 'crypto';

export const generateId = (len: number) =>
  crypto.randomBytes(len).toString('hex');
