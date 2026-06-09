import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AntecedentesService {
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

  async crear(veterinarioId: number, data: any) {
    const mascotaId = Number(data.mascotaId);

    await this.validarMascotaDelVeterinario(veterinarioId, mascotaId);

    const existe = await this.prisma.antecedenteClinico.findUnique({
      where: { mascotaId },
    });

    if (existe) {
      throw new BadRequestException(
        'Esta mascota ya tiene antecedentes clínicos registrados',
      );
    }

    const antecedente = await this.prisma.antecedenteClinico.create({
      data: {
        mascotaId,
        alergias: data.alergias,
        enfermedadesPrevias: data.enfermedadesPrevias,
        medicamentosActuales: data.medicamentosActuales,
        condicionCorporal: data.condicionCorporal
          ? Number(data.condicionCorporal)
          : undefined,
        observaciones: data.observaciones,
      },
    });

    return {
      mensaje: 'Antecedentes clínicos creados correctamente',
      antecedente,
    };
  }

  async obtenerPorMascota(veterinarioId: number, mascotaId: number) {
    await this.validarMascotaDelVeterinario(veterinarioId, mascotaId);

    const antecedente = await this.prisma.antecedenteClinico.findUnique({
      where: { mascotaId },
    });

    if (!antecedente) {
      throw new BadRequestException(
        'No existen antecedentes clínicos para esta mascota',
      );
    }

    return antecedente;
  }

  async actualizarPorMascota(veterinarioId: number, mascotaId: number, data: any) {
    await this.validarMascotaDelVeterinario(veterinarioId, mascotaId);

    const antecedente = await this.prisma.antecedenteClinico.upsert({
      where: { mascotaId },
      update: {
        alergias: data.alergias,
        enfermedadesPrevias: data.enfermedadesPrevias,
        medicamentosActuales: data.medicamentosActuales,
        condicionCorporal: data.condicionCorporal
          ? Number(data.condicionCorporal)
          : undefined,
        observaciones: data.observaciones,
      },
      create: {
        mascotaId,
        alergias: data.alergias,
        enfermedadesPrevias: data.enfermedadesPrevias,
        medicamentosActuales: data.medicamentosActuales,
        condicionCorporal: data.condicionCorporal
          ? Number(data.condicionCorporal)
          : undefined,
        observaciones: data.observaciones,
      },
    });

    return {
      mensaje: 'Antecedentes clínicos actualizados correctamente',
      antecedente,
    };
  }
}