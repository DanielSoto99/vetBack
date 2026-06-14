import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { VacunasService } from './vacunas.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

@Controller('vacunas')
@UseGuards(JwtAuthGuard)
export class VacunasController {
  constructor(private vacunasService: VacunasService) {}

  @Post()
  crear(@Req() req: any, @Body() body: any) {
    return this.vacunasService.crear(req.user.id, body);
  }

  @Get()
  listar(@Req() req: any) {
    return this.vacunasService.listar(req.user.id);
  }

  @Get('mascota/:mascotaId')
  listarPorMascota(@Req() req: any, @Param('mascotaId') mascotaId: string) {
    return this.vacunasService.listarPorMascota(req.user.id, Number(mascotaId));
  }

  @Put(':id/reforzar')
  reforzar(@Req() req: any, @Param('id') id: string) {
    return this.vacunasService.reforzar(req.user.id, Number(id));
  }

  @Put(':id')
  actualizar(@Req() req: any, @Param('id') id: string, @Body() body: any) {
    return this.vacunasService.actualizar(req.user.id, Number(id), body);
  }

  @Delete(':id')
  eliminar(@Req() req: any, @Param('id') id: string) {
    return this.vacunasService.eliminar(req.user.id, Number(id));
  }
}