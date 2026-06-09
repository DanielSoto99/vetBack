import { Module } from '@nestjs/common';
import { VacunasController } from './vacunas.controller';
import { VacunasService } from './vacunas.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [VacunasController],
  providers: [VacunasService],
})
export class VacunasModule {}