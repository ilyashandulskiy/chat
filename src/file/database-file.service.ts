import { FileDto } from './dto/file.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { FileMapper } from './file.mapper';
import { isImage } from './utils';

const fileBaseUrl = 'http://localhost:9090/';

@Injectable()
export class DatabaseFileService {
  constructor(private prisma: PrismaService, private mapper: FileMapper) {}

  async create(file: Express.Multer.File, fileName: string): Promise<FileDto> {
    if (!file) throw new NotFoundException();

    const createdFile = await this.prisma.file.create({
      data: {
        name: file.originalname,
        size: file.size,
        mimeType: file?.mimetype,
        downloadUrl: `${fileBaseUrl}${fileName}`,
        previewUrl: isImage(file?.mimetype)
          ? `${fileBaseUrl}preview-${fileName}`
          : null,
      },
    });
    return this.mapper.entityToDto(createdFile);
  }

  async checkExistance(id: string) {
    const exists = await this.prisma.file.count({ where: { id } });
    if (!exists) throw new NotFoundException();
  }
}
