import { Injectable } from '@nestjs/common';
import { FileEntity } from './file.entity';
import { FileDto } from './dto/file.dto';

@Injectable()
export class FileMapper {
  entityToDto(entity: FileEntity): FileDto {
    return {
      id: entity?.id,
      name: entity.name,
      size: entity.size,
      mimeType: entity.mimeType,
      downloadUrl: entity.downloadUrl,
      previewUrl: entity.previewUrl,
    };
  }
}
