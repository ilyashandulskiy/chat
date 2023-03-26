import { Injectable } from '@nestjs/common';
import { generateId, getMimeExtension, isImage } from './utils';
import { DatabaseFileService } from './database-file.service';
import { FileService } from './file.service';
import * as fs from 'fs/promises';
import * as sharp from 'sharp';
import constants from './constants';

@Injectable()
export class LocalFileService extends FileService {
  constructor(private databaseService: DatabaseFileService) {
    super();
  }

  async create(file: Express.Multer.File) {
    const extension = getMimeExtension(file?.mimetype);
    const fileName = generateId(10) + '.' + extension;
    const createdFile = await this.databaseService.create(file, fileName);
    await fs.writeFile(`./static/${fileName}`, file.buffer);
    if (isImage(createdFile.mimeType))
      await sharp(`./static/${fileName}`)
        .resize(constants.PREVIEW_WIDTH, constants.PREVIEW_HEIGHT)
        .toFile(`./static/preview-${fileName}`);
    return createdFile;
  }
}
