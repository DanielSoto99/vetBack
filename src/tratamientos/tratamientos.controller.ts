import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { TratamientosService } from './tratamientos.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

@Controller('tratamientos')
@UseGuards(JwtAuthGuard)
export class TratamientosController {
  constructor(private tratamientosService: TratamientosService) {}

  @Post()
  crear(@Req() req: any, @Body() body: any) {
    return this.tratamientosService.crear(req.user.id, body);
  }

  @Get('consulta/:consultaId')
  listarPorConsulta(@Req() req: any, @Param('consultaId') consultaId: string) {
    return this.tratamientosService.listarPorConsulta(req.user.id, Number(consultaId));
  }

  @Put(':id')
  actualizar(@Req() req: any, @Param('id') id: string, @Body() body: any) {
    return this.tratamientosService.actualizar(req.user.id, Number(id), body);
  }

  @Delete(':id')
  eliminar(@Req() req: any, @Param('id') id: string) {
    return this.tratamientosService.eliminar(req.user.id, Number(id));
  }
}