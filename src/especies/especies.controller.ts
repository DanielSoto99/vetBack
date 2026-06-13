import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { EspeciesService } from './especies.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

@Controller('especies')
@UseGuards(JwtAuthGuard)
export class EspeciesController {
  constructor(private especiesService: EspeciesService) {}

  @Get()
  listar() {
    return this.especiesService.listar();
  }

  @Post()
  crear(@Body() body: { nombre: string }) {
    return this.especiesService.crear(body.nombre);
  }

  @Put(':id')
  actualizar(@Param('id') id: string, @Body() body: { nombre: string; activa?: boolean }) {
    return this.especiesService.actualizar(Number(id), body);
  }

  @Delete(':id')
  eliminar(@Param('id') id: string) {
    return this.especiesService.eliminar(Number(id));
  }
}