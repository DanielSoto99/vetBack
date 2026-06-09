import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { DesparasitacionesService } from './desparasitaciones.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

@Controller('desparasitaciones')
@UseGuards(JwtAuthGuard)
export class DesparasitacionesController {
  constructor(private desparasitacionesService: DesparasitacionesService) {}

  @Post()
  crear(@Req() req: any, @Body() body: any) {
    return this.desparasitacionesService.crear(req.user.id, body);
  }

  @Get()
  listar(@Req() req: any) {
    return this.desparasitacionesService.listar(req.user.id);
  }

  @Get('mascota/:mascotaId')
  listarPorMascota(@Req() req: any, @Param('mascotaId') mascotaId: string) {
    return this.desparasitacionesService.listarPorMascota(req.user.id, Number(mascotaId));
  }

  @Put(':id')
  actualizar(@Req() req: any, @Param('id') id: string, @Body() body: any) {
    return this.desparasitacionesService.actualizar(req.user.id, Number(id), body);
  }

  @Delete(':id')
  eliminar(@Req() req: any, @Param('id') id: string) {
    return this.desparasitacionesService.eliminar(req.user.id, Number(id));
  }
}