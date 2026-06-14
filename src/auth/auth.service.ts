import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { RolUsuario } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async cambiarPassword(
    usuarioId: number,
    passwordActual: string,
    passwordNueva: string,
  ) {
    const usuario = await this.prisma.usuario.findUnique({
      where: { id: usuarioId },
    });

    if (!usuario) {
      throw new UnauthorizedException('Usuario no encontrado');
    }

    const passwordValida = await bcrypt.compare(
      passwordActual,
      usuario.passwordHash,
    );

    if (!passwordValida) {
      throw new UnauthorizedException('La contraseña actual no es correcta');
    }

    const nuevoHash = await bcrypt.hash(passwordNueva, 10);

    await this.prisma.usuario.update({
      where: { id: usuarioId },
      data: {
        passwordHash: nuevoHash,
        debeCambiarPassword: false,
      },
    });

    return {
      mensaje: 'Contraseña actualizada correctamente',
    };
  }

  async crearSuperAdmin() {
    const existe = await this.prisma.usuario.findFirst({
      where: { rol: RolUsuario.SUPER_ADMIN },
    });

    if (existe) {
      throw new BadRequestException('Ya existe un SUPER_ADMIN creado');
    }

    const passwordHash = await bcrypt.hash('Admin1234', 10);

    const usuario = await this.prisma.usuario.create({
      data: {
        nombre: 'Daniel',
        apellido: 'Soto',
        rut: '20278062-8',
        email: 'admin@vetcorp.cl',
        passwordHash,
        rol: RolUsuario.SUPER_ADMIN,
        debeCambiarPassword: false,
      },
    });

    return {
      mensaje: 'SUPER_ADMIN creado correctamente',
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        email: usuario.email,
        rol: usuario.rol,
      },
      passwordTemporal: 'Admin1234',
    };
  }

  async login(email: string, password: string) {
    const usuario = await this.prisma.usuario.findUnique({
      where: { email },
    });

    if (!usuario) {
      throw new UnauthorizedException('Credenciales incorrectas');
    }

    const passwordValida = await bcrypt.compare(password, usuario.passwordHash);

    if (!passwordValida) {
      throw new UnauthorizedException('Credenciales incorrectas');
    }

    if (!usuario.activo) {
      throw new UnauthorizedException('Usuario inactivo');
    }

    const payload = {
      sub: usuario.id,
      email: usuario.email,
      rol: usuario.rol,
    };

    const token = await this.jwtService.signAsync(payload);

    await this.prisma.usuario.update({
      where: { id: usuario.id },
      data: { ultimoLogin: new Date() },
    });

    return {
      access_token: token,
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        email: usuario.email,
        rol: usuario.rol,
        sexoUsuario: usuario.sexoUsuario,
        debeCambiarPassword: usuario.debeCambiarPassword,
      },
    };
  }

  async me(usuarioId: number) {
    const usuario = await this.prisma.usuario.findUnique({
      where: { id: usuarioId },
      select: {
        id: true,
        nombre: true,
        apellido: true,
        rut: true,
        email: true,
        rol: true,
        sexoUsuario: true,
        activo: true,
        debeCambiarPassword: true,
        telefono: true,
        ciudad: true,
        ultimoLogin: true,
        fechaCreacion: true,
      },
    });

    if (!usuario) {
      throw new UnauthorizedException('Usuario no encontrado');
    }

    return usuario;
  }
}
