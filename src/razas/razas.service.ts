import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class RazasService {
  constructor(private prisma: PrismaService) {}

  async listar() {
    return this.prisma.raza.findMany({
      where: { activa: true },
      orderBy: { nombre: 'asc' },
      include: {
        especie: true,
      },
    });
  }

  async listarPorEspecie(especieId: number) {
    return this.prisma.raza.findMany({
      where: {
        especieId,
        activa: true,
      },
      orderBy: {
        nombre: 'asc',
      },
    });
  }

  async crear(data: { nombre: string; especieId: number }) {
    if (!data.nombre || !data.nombre.trim()) {
      throw new BadRequestException('El nombre de la raza es obligatorio');
    }

    if (!data.especieId) {
      throw new BadRequestException('La especie es obligatoria');
    }

    const especie = await this.prisma.especie.findUnique({
      where: { id: Number(data.especieId) },
    });

    if (!especie) {
      throw new BadRequestException('La especie no existe');
    }

    const existe = await this.prisma.raza.findFirst({
      where: {
        nombre: data.nombre.trim(),
        especieId: Number(data.especieId),
      },
    });

    if (existe) {
      throw new BadRequestException('Ya existe esa raza para esta especie');
    }

    const raza = await this.prisma.raza.create({
      data: {
        nombre: data.nombre.trim(),
        especieId: Number(data.especieId),
      },
      include: {
        especie: true,
      },
    });

    return {
      mensaje: 'Raza creada correctamente',
      raza,
    };
  }

  async actualizar(
    id: number,
    data: { nombre?: string; especieId?: number; activa?: boolean },
  ) {
    const raza = await this.prisma.raza.update({
      where: { id },
      data: {
        nombre: data.nombre?.trim(),
        especieId: data.especieId ? Number(data.especieId) : undefined,
        activa: data.activa,
      },
      include: {
        especie: true,
      },
    });

    return {
      mensaje: 'Raza actualizada correctamente',
      raza,
    };
  }

  async eliminar(id: number) {
    await this.prisma.raza.update({
      where: { id },
      data: {
        activa: false,
      },
    });

    return {
      mensaje: 'Raza desactivada correctamente',
    };
  }
}