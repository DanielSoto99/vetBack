import { Body, Controller, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { AntecedentesService } from './antecedentes.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

@Controller('antecedentes')
@UseGuards(JwtAuthGuard)
export class AntecedentesController {
  constructor(private antecedentesService: AntecedentesService) {}

  @Post()
  crear(@Req() req: any, @Body() body: any) {
    return this.antecedentesService.crear(req.user.id, body);
  }

  @Get('mascota/:mascotaId')
  obtenerPorMascota(@Req() req: any, @Param('mascotaId') mascotaId: string) {
    return this.antecedentesService.obtenerPorMascota(
      req.user.id,
      Number(mascotaId),
    );
  }

  @Put('mascota/:mascotaId')
  actualizarPorMascota(
    @Req() req: any,
    @Param('mascotaId') mascotaId: string,
    @Body() body: any,
  ) {
    return this.antecedentesService.actualizarPorMascota(
      req.user.id,
      Number(mascotaId),
      body,
    );
  }
}