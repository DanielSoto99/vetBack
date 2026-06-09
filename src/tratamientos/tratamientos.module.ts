import { Module } from '@nestjs/common';
import { TratamientosController } from './tratamientos.controller';
import { TratamientosService } from './tratamientos.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [TratamientosController],
  providers: [TratamientosService],
})
export class TratamientosModule {}