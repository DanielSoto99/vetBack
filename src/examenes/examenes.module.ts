import { Module } from '@nestjs/common';
import { ExamenesController } from './examenes.controller';
import { ExamenesService } from './examenes.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ExamenesController],
  providers: [ExamenesService],
})
export class ExamenesModule {}