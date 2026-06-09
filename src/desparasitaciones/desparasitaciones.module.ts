import { Module } from '@nestjs/common';
import { DesparasitacionesController } from './desparasitaciones.controller';
import { DesparasitacionesService } from './desparasitaciones.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [DesparasitacionesController],
  providers: [DesparasitacionesService],
})
export class DesparasitacionesModule {}