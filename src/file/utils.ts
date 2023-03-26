import * as crypto from 'crypto';

export const generateId = (len: number) =>
  crypto.randomBytes(len).toString('hex');

export const getMimeType = (mimeType: string): string => mimeType.split('/')[0];
export const getMimeExtension = (mimeType: string): string =>
  mimeType.split('/')[1];

export const isImage = (mimeType: string) => getMimeType(mimeType) === 'image';
