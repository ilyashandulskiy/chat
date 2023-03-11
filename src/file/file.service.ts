import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as fs from 'fs/promises';
import { FileMapper } from './file.mapper';
import * as sharp from 'sharp';
import { generateId } from './utils';

@Injectable()
export class FileService {
  constructor(private prisma: PrismaService, private mapper: FileMapper) {}

  async create(file: Express.Multer.File) {
    const fileType = file?.mimetype.split('/')[0];
    const extension = file?.mimetype.split('/')[1];
    const fileName = generateId(10) + '.' + extension;

    if (!file) throw new NotFoundException();

    const createdFile = await this.prisma.file.create({
      data: {
        name: file.originalname,
        size: file.size,
        mimeType: file?.mimetype,
        downloadUrl: `http://localhost:9090/${fileName}`,
        previewUrl:
          fileType === 'image'
            ? `http://localhost:9090/preview-${fileName}`
            : undefined,
      },
    });
    await fs.writeFile(`./static/${fileName}`, file.buffer);
    if (fileType === 'image')
      await sharp(`./static/${fileName}`)
        .resize(200, 200)
        .toFile(`./static/preview-${fileName}`);
    return this.mapper.entityToDto(createdFile);
  }

  async get(fileId: string) {
    const meta = await this.prisma.file.findUnique({ where: { id: fileId } });
    if (!meta) throw new NotFoundException();
    const file = await fs.readFile(`./static/${fileId}`);
    return file.buffer;
  }
}
