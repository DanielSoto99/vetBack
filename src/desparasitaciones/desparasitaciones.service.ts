import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DesparasitacionesService {
  constructor(private prisma: PrismaService) {}

  async validarMascotaDelVeterinario(veterinarioId: number, mascotaId: number) {
    const mascota = await this.prisma.mascota.findFirst({
      where: {
        id: mascotaId,
        tutor: {
          veterinarioId,
        },
      },
    });

    if (!mascota) {
      throw new BadRequestException(
        'Mascota no encontrada o no pertenece al veterinario',
      );
    }

    return mascota;
  }

  async obtenerDesparasitacionDelVeterinario(
    veterinarioId: number,
    id: number,
  ) {
    const desparasitacion = await this.prisma.desparasitacion.findFirst({
      where: {
        id,
        mascota: {
          tutor: {
            veterinarioId,
          },
        },
      },
    });

    if (!desparasitacion) {
      throw new BadRequestException('Desparasitación no encontrada');
    }

    return desparasitacion;
  }

  async crear(veterinarioId: number, data: any) {
    const mascotaId = Number(data.mascotaId);

    await this.validarMascotaDelVeterinario(veterinarioId, mascotaId);

    const desparasitacion = await this.prisma.desparasitacion.create({
      data: {
        producto: data.producto,
        fechaAplicacion: new Date(data.fechaAplicacion),
        fechaProximaDosis: data.fechaProximaDosis
          ? new Date(data.fechaProximaDosis)
          : undefined,
        dosis: data.dosis,
        observaciones: data.observaciones,
        estado: data.estado || 'VIGENTE',
        mascotaId,
      },
      include: {
        mascota: {
          include: {
            tutor: true,
            especie: true,
          },
        },
      },
    });

    return {
      mensaje: 'Desparasitación registrada correctamente',
      desparasitacion,
    };
  }

  async listar(veterinarioId: number) {
    return this.prisma.desparasitacion.findMany({
      where: {
        mascota: {
          tutor: {
            veterinarioId,
          },
        },
      },
      orderBy: {
        fechaAplicacion: 'desc',
      },
      include: {
        mascota: {
          include: {
            tutor: true,
            especie: true,
          },
        },
      },
    });
  }

  async listarPorMascota(veterinarioId: number, mascotaId: number) {
    await this.validarMascotaDelVeterinario(veterinarioId, mascotaId);

    return this.prisma.desparasitacion.findMany({
      where: {
        mascotaId,
      },
      orderBy: {
        fechaAplicacion: 'desc',
      },
    });
  }

  async actualizar(veterinarioId: number, id: number, data: any) {
    await this.obtenerDesparasitacionDelVeterinario(veterinarioId, id);

    if (data.mascotaId) {
      await this.validarMascotaDelVeterinario(
        veterinarioId,
        Number(data.mascotaId),
      );
    }

    const desparasitacion = await this.prisma.desparasitacion.update({
      where: { id },
      data: {
        producto: data.producto,
        fechaAplicacion: data.fechaAplicacion
          ? new Date(data.fechaAplicacion)
          : undefined,
        fechaProximaDosis: data.fechaProximaDosis
          ? new Date(data.fechaProximaDosis)
          : undefined,
        dosis: data.dosis,
        observaciones: data.observaciones,
        estado: data.estado,
        mascotaId: data.mascotaId ? Number(data.mascotaId) : undefined,
      },
      include: {
        mascota: {
          include: {
            tutor: true,
            especie: true,
          },
        },
      },
    });

    return {
      mensaje: 'Desparasitación actualizada correctamente',
      desparasitacion,
    };
  }

  async renovar(veterinarioId: number, id: number) {
    await this.obtenerDesparasitacionDelVeterinario(veterinarioId, id);

    const desparasitacion = await this.prisma.desparasitacion.update({
      where: { id },
      data: {
        estado: 'RENOVADA',
      },
      include: {
        mascota: {
          include: {
            tutor: true,
            especie: true,
          },
        },
      },
    });

    return {
      mensaje: 'Desparasitación marcada como renovada',
      desparasitacion,
    };
  }

  async eliminar(veterinarioId: number, id: number) {
    await this.obtenerDesparasitacionDelVeterinario(veterinarioId, id);

    await this.prisma.desparasitacion.delete({
      where: { id },
    });

    return {
      mensaje: 'Desparasitación eliminada correctamente',
    };
  }
}