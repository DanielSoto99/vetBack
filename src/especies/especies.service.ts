import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class EspeciesService {
  constructor(private prisma: PrismaService) {}

  async listar() {
    return this.prisma.especie.findMany({
      where: { activa: true },
      orderBy: { nombre: 'asc' },
    });
  }

  async crear(nombre: string) {
    if (!nombre || !nombre.trim()) {
      throw new BadRequestException('El nombre de la especie es obligatorio');
    }

    const existe = await this.prisma.especie.findUnique({
      where: { nombre: nombre.trim() },
    });

    if (existe) {
      throw new BadRequestException('Ya existe una especie con ese nombre');
    }

    const especie = await this.prisma.especie.create({
      data: { nombre: nombre.trim() },
    });

    return {
      mensaje: 'Especie creada correctamente',
      especie,
    };
  }

  async actualizar(id: number, data: { nombre: string; activa?: boolean }) {
    const especie = await this.prisma.especie.update({
      where: { id },
      data: {
        nombre: data.nombre?.trim(),
        activa: data.activa,
      },
    });

    return {
      mensaje: 'Especie actualizada correctamente',
      especie,
    };
  }

  async eliminar(id: number) {
    await this.prisma.especie.update({
      where: { id },
      data: { activa: false },
    });

    return {
      mensaje: 'Especie desactivada correctamente',
    };
  }
}