import { Module } from '@nestjs/common';
import { AntecedentesController } from './antecedentes.controller';
import { AntecedentesService } from './antecedentes.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [AntecedentesController],
  providers: [AntecedentesService],
})
export class AntecedentesModule {}