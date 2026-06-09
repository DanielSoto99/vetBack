import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Req, UseGuards } from '@nestjs/common';
import { AgendaService } from './agenda.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

@Controller('agenda')
@UseGuards(JwtAuthGuard)
export class AgendaController {
  constructor(private agendaService: AgendaService) {}

  @Post()
  crear(@Req() req: any, @Body() body: any) {
    return this.agendaService.crear(req.user.id, body);
  }

  @Get()
  listar(@Req() req: any) {
    return this.agendaService.listar(req.user.id);
  }

  @Get(':id')
  obtener(@Req() req: any, @Param('id') id: string) {
    return this.agendaService.obtener(req.user.id, Number(id));
  }

  @Put(':id')
  actualizar(@Req() req: any, @Param('id') id: string, @Body() body: any) {
    return this.agendaService.actualizar(req.user.id, Number(id), body);
  }

  @Patch(':id/estado')
  cambiarEstado(@Req() req: any, @Param('id') id: string, @Body() body: any) {
    return this.agendaService.cambiarEstado(req.user.id, Number(id), body.estado);
  }

  @Delete(':id')
  eliminar(@Req() req: any, @Param('id') id: string) {
    return this.agendaService.eliminar(req.user.id, Number(id));
  }
}