import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { TutoresService } from './tutores.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

@Controller('tutores')
@UseGuards(JwtAuthGuard)
export class TutoresController {
  constructor(private tutoresService: TutoresService) {}

  @Post()
  crearTutor(@Req() req: any, @Body() body: any) {
    return this.tutoresService.crearTutor(req.user.id, body);
  }

  @Get()
  listarTutores(@Req() req: any) {
    return this.tutoresService.listarTutores(req.user.id);
  }

  @Get(':id')
  obtenerTutor(@Req() req: any, @Param('id') id: string) {
    return this.tutoresService.obtenerTutor(req.user.id, Number(id));
  }

  @Put(':id')
  editarTutor(@Req() req: any, @Param('id') id: string, @Body() body: any) {
    return this.tutoresService.editarTutor(req.user.id, Number(id), body);
  }

  @Delete(':id')
  eliminarTutor(@Req() req: any, @Param('id') id: string) {
    return this.tutoresService.eliminarTutor(req.user.id, Number(id));
  }
}