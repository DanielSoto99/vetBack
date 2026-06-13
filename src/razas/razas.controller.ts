import { Body, Controller, Get, Param, Post, Put, Delete, UseGuards } from '@nestjs/common';
import { RazasService } from './razas.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

@Controller('razas')
@UseGuards(JwtAuthGuard)
export class RazasController {
  constructor(private razasService: RazasService) {}

  @Get()
  listar() {
    return this.razasService.listar();
  }

  @Get('especie/:especieId')
  listarPorEspecie(@Param('especieId') especieId: string) {
    return this.razasService.listarPorEspecie(Number(especieId));
  }

  @Post()
  crear(@Body() body: { nombre: string; especieId: number }) {
    return this.razasService.crear(body);
  }

  @Put(':id')
  actualizar(
    @Param('id') id: string,
    @Body() body: { nombre?: string; especieId?: number; activa?: boolean },
  ) {
    return this.razasService.actualizar(Number(id), body);
  }

  @Delete(':id')
  eliminar(@Param('id') id: string) {
    return this.razasService.eliminar(Number(id));
  }
}