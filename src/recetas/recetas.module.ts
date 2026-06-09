import { Module } from '@nestjs/common';
import { RecetasController } from './recetas.controller';
import { RecetasService } from './recetas.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [RecetasController],
  providers: [RecetasService],
})
export class RecetasModule {}