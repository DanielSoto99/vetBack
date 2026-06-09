import { Body, Controller, Get, Param, Patch, Post, Put, UseGuards } from '@nestjs/common';
import { RolUsuario } from '@prisma/client';
import { UsuariosService } from './usuarios.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';

@Controller('usuarios')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(RolUsuario.SUPER_ADMIN)
export class UsuariosController {
  constructor(private usuariosService: UsuariosService) {}

  @Post('crear-veterinario')
  crearVeterinario(
    @Body()
    body: {
      nombre: string;
      apellido?: string;
      rut?: string;
      email: string;
      telefono?: string;
      ciudad?: string;
    },
  ) {
    return this.usuariosService.crearVeterinario(body);
  }

  @Get()
  listarUsuarios() {
    return this.usuariosService.listarUsuarios();
  }

  @Patch(':id/desactivar')
  desactivarUsuario(@Param('id') id: string) {
    return this.usuariosService.desactivarUsuario(Number(id));
  }

  @Patch(':id/activar')
  activarUsuario(@Param('id') id: string) {
    return this.usuariosService.activarUsuario(Number(id));
  }

  @Patch(':id/reset-password')
  resetPassword(@Param('id') id: string) {
    return this.usuariosService.resetPassword(Number(id));
  }


  @Get(':id')
obtenerUsuario(@Param('id') id: string) {
  return this.usuariosService.obtenerUsuario(Number(id));
}

@Put(':id')
editarUsuario(
  @Param('id') id: string,
  @Body()
  body: {
    nombre: string;
    apellido?: string;
    rut?: string;
    email: string;
    telefono?: string;
    ciudad?: string;
  },
) {
  return this.usuariosService.editarUsuario(Number(id), body);
}

}