import { Module } from '@nestjs/common';
import { RazasController } from './razas.controller';
import { RazasService } from './razas.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [RazasController],
  providers: [RazasService],
})
export class RazasModule {}