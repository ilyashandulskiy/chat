import { Module } from '@nestjs/common';
import { FileController } from './file.controller';
import { FileService } from './file.service';
import { PrismaService } from '../prisma/prisma.service';
import { FileMapper } from './file.mapper';

@Module({
  controllers: [FileController],
  providers: [FileService, PrismaService, FileMapper],
})
export class FileModule {}
