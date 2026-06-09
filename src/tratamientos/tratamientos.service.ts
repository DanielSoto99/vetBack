import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TratamientosService {
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

  async obtenerTratamientoDelVeterinario(veterinarioId: number, id: number) {
    const tratamiento = await this.prisma.tratamientoMedicamento.findFirst({
      where: {
        id,
        consulta: {
          veterinarioId,
        },
      },
    });

    if (!tratamiento) {
      throw new BadRequestException('Tratamiento no encontrado');
    }

    return tratamiento;
  }

  async crear(veterinarioId: number, data: any) {
    const consultaId = Number(data.consultaId);

    await this.validarConsultaDelVeterinario(veterinarioId, consultaId);

    const tratamiento = await this.prisma.tratamientoMedicamento.create({
      data: {
        consultaId,
        nombre: data.nombre,
        dosis: data.dosis,
        frecuencia: data.frecuencia,
        duracion: data.duracion,
        via: data.via,
        indicaciones: data.indicaciones,
      },
    });

    return {
      mensaje: 'Tratamiento registrado correctamente',
      tratamiento,
    };
  }

  async listarPorConsulta(veterinarioId: number, consultaId: number) {
    await this.validarConsultaDelVeterinario(veterinarioId, consultaId);

    return this.prisma.tratamientoMedicamento.findMany({
      where: { consultaId },
      orderBy: { fechaCreacion: 'desc' },
    });
  }

  async actualizar(veterinarioId: number, id: number, data: any) {
    await this.obtenerTratamientoDelVeterinario(veterinarioId, id);

    const tratamiento = await this.prisma.tratamientoMedicamento.update({
      where: { id },
      data: {
        nombre: data.nombre,
        dosis: data.dosis,
        frecuencia: data.frecuencia,
        duracion: data.duracion,
        via: data.via,
        indicaciones: data.indicaciones,
      },
    });

    return {
      mensaje: 'Tratamiento actualizado correctamente',
      tratamiento,
    };
  }

  async eliminar(veterinarioId: number, id: number) {
    await this.obtenerTratamientoDelVeterinario(veterinarioId, id);

    await this.prisma.tratamientoMedicamento.delete({
      where: { id },
    });

    return {
      mensaje: 'Tratamiento eliminado correctamente',
    };
  }
}