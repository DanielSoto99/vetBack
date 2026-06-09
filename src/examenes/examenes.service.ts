import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ExamenesService {
  constructor(private prisma: PrismaService) {}

  async validarConsultaDelVeterinario(veterinarioId: number, consultaId: number) {
    const consulta = await this.prisma.consulta.findFirst({
      where: {
        id: consultaId,
        veterinarioId,
      },
    });

    if (!consulta) {
      throw new BadRequestException('Consulta no encontrada o no pertenece al veterinario');
    }

    return consulta;
  }

  async obtenerExamenDelVeterinario(veterinarioId: number, id: number) {
    const examen = await this.prisma.examenSolicitado.findFirst({
      where: {
        id,
        consulta: {
          veterinarioId,
        },
      },
    });

    if (!examen) {
      throw new BadRequestException('Examen no encontrado');
    }

    return examen;
  }

  async crear(veterinarioId: number, data: any) {
    const consultaId = Number(data.consultaId);

    await this.validarConsultaDelVeterinario(veterinarioId, consultaId);

    const examen = await this.prisma.examenSolicitado.create({
      data: {
        consultaId,
        nombre: data.nombre,
        tipo: data.tipo,
        estado: data.estado ?? 'SOLICITADO',
        resultado: data.resultado,
        observaciones: data.observaciones,
        fechaSolicitud: data.fechaSolicitud
          ? new Date(data.fechaSolicitud)
          : new Date(),
        fechaResultado: data.fechaResultado
          ? new Date(data.fechaResultado)
          : undefined,
      },
    });

    return {
      mensaje: 'Examen solicitado correctamente',
      examen,
    };
  }

  async listarPorConsulta(veterinarioId: number, consultaId: number) {
    await this.validarConsultaDelVeterinario(veterinarioId, consultaId);

    return this.prisma.examenSolicitado.findMany({
      where: { consultaId },
      orderBy: { fechaSolicitud: 'desc' },
    });
  }

  async actualizar(veterinarioId: number, id: number, data: any) {
    await this.obtenerExamenDelVeterinario(veterinarioId, id);

    const examen = await this.prisma.examenSolicitado.update({
      where: { id },
      data: {
        nombre: data.nombre,
        tipo: data.tipo,
        estado: data.estado,
        resultado: data.resultado,
        observaciones: data.observaciones,
        fechaSolicitud: data.fechaSolicitud
          ? new Date(data.fechaSolicitud)
          : undefined,
        fechaResultado: data.fechaResultado
          ? new Date(data.fechaResultado)
          : undefined,
      },
    });

    return {
      mensaje: 'Examen actualizado correctamente',
      examen,
    };
  }

  async eliminar(veterinarioId: number, id: number) {
    await this.obtenerExamenDelVeterinario(veterinarioId, id);

    await this.prisma.examenSolicitado.delete({
      where: { id },
    });

    return {
      mensaje: 'Examen eliminado correctamente',
    };
  }
}