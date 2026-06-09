import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ArchivosService {
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

  async validarConsultaDelVeterinario(veterinarioId: number, consultaId: number) {
    const consulta = await this.prisma.consulta.findFirst({
      where: {
        id: consultaId,
        veterinarioId,
      },
    });

    if (!consulta) {
      throw new BadRequestException(
        'Consulta no encontrada o no pertenece al veterinario',
      );
    }

    return consulta;
  }

  async validarExamenDelVeterinario(veterinarioId: number, examenId: number) {
    const examen = await this.prisma.examenSolicitado.findFirst({
      where: {
        id: examenId,
        consulta: {
          veterinarioId,
        },
      },
    });

    if (!examen) {
      throw new BadRequestException(
        'Examen no encontrado o no pertenece al veterinario',
      );
    }

    return examen;
  }

  async obtenerArchivoDelVeterinario(veterinarioId: number, id: number) {
    const archivo = await this.prisma.archivoClinico.findFirst({
      where: {
        id,
        mascota: {
          tutor: {
            veterinarioId,
          },
        },
      },
    });

    if (!archivo) {
      throw new BadRequestException('Archivo no encontrado');
    }

    return archivo;
  }

  async crear(veterinarioId: number, data: any) {
    const mascotaId = Number(data.mascotaId);

    await this.validarMascotaDelVeterinario(veterinarioId, mascotaId);

    if (data.consultaId) {
      await this.validarConsultaDelVeterinario(
        veterinarioId,
        Number(data.consultaId),
      );
    }

    if (data.examenId) {
      await this.validarExamenDelVeterinario(veterinarioId, Number(data.examenId));
    }

    const archivo = await this.prisma.archivoClinico.create({
      data: {
        mascotaId,
        consultaId: data.consultaId ? Number(data.consultaId) : undefined,
        examenId: data.examenId ? Number(data.examenId) : undefined,
        nombreOriginal: data.nombreOriginal,
        nombreArchivo: data.nombreArchivo,
        tipoMime: data.tipoMime,
        url: data.url,
        categoria: data.categoria,
        observaciones: data.observaciones,
      },
      include: {
        mascota: {
          include: {
            tutor: true,
          },
        },
        consulta: true,
        examen: true,
      },
    });

    return {
      mensaje: 'Archivo clínico registrado correctamente',
      archivo,
    };
  }

  async listarPorMascota(veterinarioId: number, mascotaId: number) {
    await this.validarMascotaDelVeterinario(veterinarioId, mascotaId);

    return this.prisma.archivoClinico.findMany({
      where: { mascotaId },
      orderBy: { fechaCreacion: 'desc' },
    });
  }

  async listarPorConsulta(veterinarioId: number, consultaId: number) {
    await this.validarConsultaDelVeterinario(veterinarioId, consultaId);

    return this.prisma.archivoClinico.findMany({
      where: { consultaId },
      orderBy: { fechaCreacion: 'desc' },
    });
  }

  async listarPorExamen(veterinarioId: number, examenId: number) {
    await this.validarExamenDelVeterinario(veterinarioId, examenId);

    return this.prisma.archivoClinico.findMany({
      where: { examenId },
      orderBy: { fechaCreacion: 'desc' },
    });
  }

  async eliminar(veterinarioId: number, id: number) {
    await this.obtenerArchivoDelVeterinario(veterinarioId, id);

    await this.prisma.archivoClinico.delete({
      where: { id },
    });

    return {
      mensaje: 'Archivo clínico eliminado correctamente',
    };
  }
}