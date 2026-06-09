import { Body, Controller, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { ConsultasService } from './consultas.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

@Controller('consultas')
@UseGuards(JwtAuthGuard)
export class ConsultasController {
  constructor(private consultasService: ConsultasService) {}

  @Post()
  crear(@Req() req: any, @Body() body: any) {
    return this.consultasService.crear(req.user.id, body);
  }

  @Get()
  listar(@Req() req: any) {
    return this.consultasService.listar(req.user.id);
  }

  @Get(':id')
  obtener(@Req() req: any, @Param('id') id: string) {
    return this.consultasService.obtener(req.user.id, Number(id));
  }

  @Put(':id')
  actualizar(@Req() req: any, @Param('id') id: string, @Body() body: any) {
    return this.consultasService.actualizar(req.user.id, Number(id), body);
  }
}