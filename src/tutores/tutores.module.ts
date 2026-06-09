import { Module } from '@nestjs/common';
import { TutoresController } from './tutores.controller';
import { TutoresService } from './tutores.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [TutoresController],
  providers: [TutoresService],
})
export class TutoresModule {}