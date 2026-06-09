import { Body, Controller, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { RecetasService } from './recetas.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

@Controller('recetas')
@UseGuards(JwtAuthGuard)
export class RecetasController {
  constructor(private recetasService: RecetasService) {}

  @Post()
  crear(@Req() req: any, @Body() body: any) {
    return this.recetasService.crear(req.user.id, body);
  }

  @Get()
  listar(@Req() req: any) {
    return this.recetasService.listar(req.user.id);
  }

  @Get('consulta/:consultaId')
  obtenerPorConsulta(@Req() req: any, @Param('consultaId') consultaId: string) {
    return this.recetasService.obtenerPorConsulta(req.user.id, Number(consultaId));
  }

  @Put(':id/emitir')
  emitir(@Req() req: any, @Param('id') id: string) {
    return this.recetasService.emitir(req.user.id, Number(id));
  }

  @Put(':id')
  actualizar(@Req() req: any, @Param('id') id: string, @Body() body: any) {
    return this.recetasService.actualizar(req.user.id, Number(id), body);
  }
}