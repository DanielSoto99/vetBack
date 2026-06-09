import { Body, Controller, Delete, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { ArchivosService } from './archivos.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

@Controller('archivos')
@UseGuards(JwtAuthGuard)
export class ArchivosController {
  constructor(private archivosService: ArchivosService) {}

  @Post()
  crear(@Req() req: any, @Body() body: any) {
    return this.archivosService.crear(req.user.id, body);
  }

  @Get('mascota/:mascotaId')
  listarPorMascota(@Req() req: any, @Param('mascotaId') mascotaId: string) {
    return this.archivosService.listarPorMascota(req.user.id, Number(mascotaId));
  }

  @Get('consulta/:consultaId')
  listarPorConsulta(@Req() req: any, @Param('consultaId') consultaId: string) {
    return this.archivosService.listarPorConsulta(req.user.id, Number(consultaId));
  }

  @Get('examen/:examenId')
  listarPorExamen(@Req() req: any, @Param('examenId') examenId: string) {
    return this.archivosService.listarPorExamen(req.user.id, Number(examenId));
  }

  @Delete(':id')
  eliminar(@Req() req: any, @Param('id') id: string) {
    return this.archivosService.eliminar(req.user.id, Number(id));
  }
}