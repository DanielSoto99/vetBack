import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class VacunasService {
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

  async obtenerVacunaDelVeterinario(veterinarioId: number, id: number) {
    const vacuna = await this.prisma.vacuna.findFirst({
      where: {
        id,
        mascota: {
          tutor: {
            veterinarioId,
          },
        },
      },
    });

    if (!vacuna) {
      throw new BadRequestException('Vacuna no encontrada');
    }

    return vacuna;
  }

  async crear(veterinarioId: number, data: any) {
    const mascotaId = Number(data.mascotaId);

    await this.validarMascotaDelVeterinario(veterinarioId, mascotaId);

    const vacuna = await this.prisma.vacuna.create({
      data: {
        nombre: data.nombre,
        fechaAplicacion: new Date(data.fechaAplicacion),
        fechaProximaDosis: data.fechaProximaDosis
          ? new Date(data.fechaProximaDosis)
          : undefined,
        lote: data.lote,
        laboratorio: data.laboratorio,
        observaciones: data.observaciones,
        mascotaId,
      },
      include: {
        mascota: {
          include: {
            tutor: true,
          },
        },
      },
    });

    return {
      mensaje: 'Vacuna registrada correctamente',
      vacuna,
    };
  }

  async listar(veterinarioId: number) {
    return this.prisma.vacuna.findMany({
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
          },
        },
      },
    });
  }

  async listarPorMascota(veterinarioId: number, mascotaId: number) {
    await this.validarMascotaDelVeterinario(veterinarioId, mascotaId);

    return this.prisma.vacuna.findMany({
      where: {
        mascotaId,
      },
      orderBy: {
        fechaAplicacion: 'desc',
      },
    });
  }

  async actualizar(veterinarioId: number, id: number, data: any) {
    await this.obtenerVacunaDelVeterinario(veterinarioId, id);

    if (data.mascotaId) {
      await this.validarMascotaDelVeterinario(
        veterinarioId,
        Number(data.mascotaId),
      );
    }

    const vacuna = await this.prisma.vacuna.update({
      where: { id },
      data: {
        nombre: data.nombre,
        fechaAplicacion: data.fechaAplicacion
          ? new Date(data.fechaAplicacion)
          : undefined,
        fechaProximaDosis: data.fechaProximaDosis
          ? new Date(data.fechaProximaDosis)
          : undefined,
        lote: data.lote,
        laboratorio: data.laboratorio,
        observaciones: data.observaciones,
        mascotaId: data.mascotaId ? Number(data.mascotaId) : undefined,
      },
      include: {
        mascota: {
          include: {
            tutor: true,
          },
        },
      },
    });

    return {
      mensaje: 'Vacuna actualizada correctamente',
      vacuna,
    };
  }

  async eliminar(veterinarioId: number, id: number) {
    await this.obtenerVacunaDelVeterinario(veterinarioId, id);

    await this.prisma.vacuna.delete({
      where: { id },
    });

    return {
      mensaje: 'Vacuna eliminada correctamente',
    };
  }
}