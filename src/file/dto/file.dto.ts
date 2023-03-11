export class FileDto {
  id: string;
  name: string;
  size: number;
  mimeType: string;
  previewUrl?: string;
  downloadUrl: string;
}
