import { Module } from '@nestjs/common';
import { ArchivosController } from './archivos.controller';
import { ArchivosService } from './archivos.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ArchivosController],
  providers: [ArchivosService],
})
export class ArchivosModule {}