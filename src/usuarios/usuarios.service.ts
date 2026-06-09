import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RolUsuario } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuariosService {
  constructor(private prisma: PrismaService) {}

  async crearVeterinario(data: {
    nombre: string;
    apellido?: string;
    rut?: string;
    email: string;
    telefono?: string;
    ciudad?: string;
  }) {
    const existe = await this.prisma.usuario.findUnique({
      where: { email: data.email },
    });

    if (existe) {
      throw new BadRequestException('Ya existe un usuario con ese email');
    }

    const passwordTemporal = 'Vet1234';
    const passwordHash = await bcrypt.hash(passwordTemporal, 10);

    const usuario = await this.prisma.usuario.create({
      data: {
        nombre: data.nombre,
        apellido: data.apellido,
        rut: data.rut,
        email: data.email,
        telefono: data.telefono,
        ciudad: data.ciudad,
        passwordHash,
        rol: RolUsuario.VETERINARIO,
        debeCambiarPassword: true,
      },
    });

    return {
      mensaje: 'Veterinario creado correctamente',
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        email: usuario.email,
        rol: usuario.rol,
        debeCambiarPassword: usuario.debeCambiarPassword,
      },
      passwordTemporal,
    };
  }
  async listarUsuarios() {
    return this.prisma.usuario.findMany({
      orderBy: { fechaCreacion: 'desc' },
      select: {
        id: true,
        nombre: true,
        apellido: true,
        rut: true,
        email: true,
        rol: true,
        activo: true,
        debeCambiarPassword: true,
        telefono: true,
        ciudad: true,
        ultimoLogin: true,
        fechaCreacion: true,
      },
    });
  }

  async desactivarUsuario(id: number) {
    const usuario = await this.prisma.usuario.update({
      where: { id },
      data: { activo: false },
    });

    return {
      mensaje: 'Usuario desactivado correctamente',
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        email: usuario.email,
        activo: usuario.activo,
      },
    };
  }

  async activarUsuario(id: number) {
    const usuario = await this.prisma.usuario.update({
      where: { id },
      data: { activo: true },
    });

    return {
      mensaje: 'Usuario activado correctamente',
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        email: usuario.email,
        activo: usuario.activo,
      },
    };
  }

  async resetPassword(id: number) {
    const passwordTemporal = 'Vet1234';
    const passwordHash = await bcrypt.hash(passwordTemporal, 10);

    const usuario = await this.prisma.usuario.update({
      where: { id },
      data: {
        passwordHash,
        debeCambiarPassword: true,
      },
    });

    return {
      mensaje: 'Contraseña temporal generada correctamente',
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        email: usuario.email,
        debeCambiarPassword: usuario.debeCambiarPassword,
      },
      passwordTemporal,
    };
  }


  async obtenerUsuario(id: number) {
  const usuario = await this.prisma.usuario.findUnique({
    where: { id },
    select: {
      id: true,
      nombre: true,
      apellido: true,
      rut: true,
      email: true,
      rol: true,
      activo: true,
      debeCambiarPassword: true,
      telefono: true,
      ciudad: true,
      ultimoLogin: true,
      fechaCreacion: true,
    },
  });

  if (!usuario) {
    throw new BadRequestException('Usuario no encontrado');
  }

  return usuario;
}

async editarUsuario(
  id: number,
  data: {
    nombre: string;
    apellido?: string;
    rut?: string;
    email: string;
    telefono?: string;
    ciudad?: string;
  },
) {
  const existe = await this.prisma.usuario.findFirst({
    where: {
      email: data.email,
      NOT: { id },
    },
  });

  if (existe) {
    throw new BadRequestException('Ya existe otro usuario con ese email');
  }

  const usuario = await this.prisma.usuario.update({
    where: { id },
    data: {
      nombre: data.nombre,
      apellido: data.apellido,
      rut: data.rut,
      email: data.email,
      telefono: data.telefono,
      ciudad: data.ciudad,
    },
  });

  return {
    mensaje: 'Usuario actualizado correctamente',
    usuario: {
      id: usuario.id,
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      rut: usuario.rut,
      email: usuario.email,
      telefono: usuario.telefono,
      ciudad: usuario.ciudad,
      rol: usuario.rol,
      activo: usuario.activo,
    },
  };
}
}
