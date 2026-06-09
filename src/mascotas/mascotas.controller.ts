import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { MascotasService } from './mascotas.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

@Controller('mascotas')
@UseGuards(JwtAuthGuard)
export class MascotasController {
  constructor(private mascotasService: MascotasService) {}

  @Post()
  crearMascota(@Req() req: any, @Body() body: any) {
    return this.mascotasService.crearMascota(req.user.id, body);
  }

  @Get()
  listarMascotas(@Req() req: any) {
    return this.mascotasService.listarMascotas(req.user.id);
  }

  @Get(':id/ficha-completa')
fichaCompleta(@Req() req: any, @Param('id') id: string) {
  return this.mascotasService.fichaCompleta(req.user.id, Number(id));
}

  @Get(':id')
  obtenerMascota(@Req() req: any, @Param('id') id: string) {
    return this.mascotasService.obtenerMascota(req.user.id, Number(id));
  }

  @Put(':id')
  editarMascota(@Req() req: any, @Param('id') id: string, @Body() body: any) {
    return this.mascotasService.editarMascota(req.user.id, Number(id), body);
  }

  @Delete(':id')
  eliminarMascota(@Req() req: any, @Param('id') id: string) {
    return this.mascotasService.eliminarMascota(req.user.id, Number(id));
  }
}
