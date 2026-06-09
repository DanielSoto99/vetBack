import { BadRequestException, Injectable } from '@nestjs/common';
import { EstadoCita } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AgendaService {
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
      throw new BadRequestException('Mascota no encontrada o no pertenece al veterinario');
    }

    return mascota;
  }

  async validarTutorDelVeterinario(veterinarioId: number, tutorId: number) {
    const tutor = await this.prisma.tutor.findFirst({
      where: {
        id: tutorId,
        veterinarioId,
      },
    });

    if (!tutor) {
      throw new BadRequestException('Tutor no encontrado o no pertenece al veterinario');
    }

    return tutor;
  }

  async obtenerCitaDelVeterinario(veterinarioId: number, id: number) {
    const cita = await this.prisma.cita.findFirst({
      where: {
        id,
        veterinarioId,
      },
      include: {
        mascota: true,
        tutor: true,
      },
    });

    if (!cita) {
      throw new BadRequestException('Cita no encontrada');
    }

    return cita;
  }

  async crear(veterinarioId: number, data: any) {
    if (data.mascotaId) {
      await this.validarMascotaDelVeterinario(veterinarioId, Number(data.mascotaId));
    }

    if (data.tutorId) {
      await this.validarTutorDelVeterinario(veterinarioId, Number(data.tutorId));
    }

    const cita = await this.prisma.cita.create({
      data: {
        titulo: data.titulo,
        tipo: data.tipo,
        estado: data.estado ?? EstadoCita.PROGRAMADA,
        fechaInicio: new Date(data.fechaInicio),
        fechaFin: new Date(data.fechaFin),
        motivo: data.motivo,
        observaciones: data.observaciones,
        veterinarioId,
        mascotaId: data.mascotaId ? Number(data.mascotaId) : undefined,
        tutorId: data.tutorId ? Number(data.tutorId) : undefined,
      },
      include: {
        mascota: true,
        tutor: true,
      },
    });

    return {
      mensaje: 'Cita creada correctamente',
      cita,
    };
  }

  async listar(veterinarioId: number) {
    return this.prisma.cita.findMany({
      where: { veterinarioId },
      orderBy: { fechaInicio: 'asc' },
      include: {
        mascota: true,
        tutor: true,
      },
    });
  }

  async obtener(veterinarioId: number, id: number) {
    return this.obtenerCitaDelVeterinario(veterinarioId, id);
  }

  async actualizar(veterinarioId: number, id: number, data: any) {
    await this.obtenerCitaDelVeterinario(veterinarioId, id);

    if (data.mascotaId) {
      await this.validarMascotaDelVeterinario(veterinarioId, Number(data.mascotaId));
    }

    if (data.tutorId) {
      await this.validarTutorDelVeterinario(veterinarioId, Number(data.tutorId));
    }

    const cita = await this.prisma.cita.update({
      where: { id },
      data: {
        titulo: data.titulo,
        tipo: data.tipo,
        estado: data.estado,
        fechaInicio: data.fechaInicio ? new Date(data.fechaInicio) : undefined,
        fechaFin: data.fechaFin ? new Date(data.fechaFin) : undefined,
        motivo: data.motivo,
        observaciones: data.observaciones,
        mascotaId: data.mascotaId ? Number(data.mascotaId) : undefined,
        tutorId: data.tutorId ? Number(data.tutorId) : undefined,
      },
      include: {
        mascota: true,
        tutor: true,
      },
    });

    return {
      mensaje: 'Cita actualizada correctamente',
      cita,
    };
  }

  async cambiarEstado(veterinarioId: number, id: number, estado: EstadoCita) {
    await this.obtenerCitaDelVeterinario(veterinarioId, id);

    const cita = await this.prisma.cita.update({
      where: { id },
      data: { estado },
      include: {
        mascota: true,
        tutor: true,
      },
    });

    return {
      mensaje: 'Estado de cita actualizado correctamente',
      cita,
    };
  }

  async eliminar(veterinarioId: number, id: number) {
    await this.obtenerCitaDelVeterinario(veterinarioId, id);

    await this.prisma.cita.delete({
      where: { id },
    });

    return {
      mensaje: 'Cita eliminada correctamente',
    };
  }
}