import { Module } from '@nestjs/common';
import { MascotasController } from './mascotas.controller';
import { MascotasService } from './mascotas.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [MascotasController],
  providers: [MascotasService],
})
export class MascotasModule {}