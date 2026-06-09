import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { ExamenesService } from './examenes.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

@Controller('examenes')
@UseGuards(JwtAuthGuard)
export class ExamenesController {
  constructor(private examenesService: ExamenesService) {}

  @Post()
  crear(@Req() req: any, @Body() body: any) {
    return this.examenesService.crear(req.user.id, body);
  }

  @Get('consulta/:consultaId')
  listarPorConsulta(@Req() req: any, @Param('consultaId') consultaId: string) {
    return this.examenesService.listarPorConsulta(req.user.id, Number(consultaId));
  }

  @Put(':id')
  actualizar(@Req() req: any, @Param('id') id: string, @Body() body: any) {
    return this.examenesService.actualizar(req.user.id, Number(id), body);
  }

  @Delete(':id')
  eliminar(@Req() req: any, @Param('id') id: string) {
    return this.examenesService.eliminar(req.user.id, Number(id));
  }
}