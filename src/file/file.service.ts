import { FileDto } from './dto/file.dto';

export abstract class FileService {
  abstract create(file: Express.Multer.File): Promise<FileDto>;
}
