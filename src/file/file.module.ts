import { Module } from '@nestjs/common';
import { FileController } from './file.controller';
import { LocalFileService } from './local-file.service';
import { PrismaService } from '../prisma/prisma.service';
import { FileMapper } from './file.mapper';
import { FileService } from './file.service';
import { DatabaseFileService } from './database-file.service';

@Module({
  controllers: [FileController],
  providers: [
    { provide: FileService, useClass: LocalFileService },
    DatabaseFileService,
    PrismaService,
    FileMapper,
  ],
})
export class FileModule {}
