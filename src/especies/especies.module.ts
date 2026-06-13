import { Module } from '@nestjs/common';
import { EspeciesController } from './especies.controller';
import { EspeciesService } from './especies.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [EspeciesController],
  providers: [EspeciesService],
})
export class EspeciesModule {}