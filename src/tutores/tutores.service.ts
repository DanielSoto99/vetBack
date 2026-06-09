import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TutoresService {
  constructor(private prisma: PrismaService) {}

  async crearTutor(veterinarioId: number, data: any) {
    const tutor = await this.prisma.tutor.create({
      data: {
        nombre: data.nombre,
        apellido: data.apellido,
        rut: data.rut,
        telefono: data.telefono,
        email: data.email,
        direccion: data.direccion,
        ciudad: data.ciudad,
        observaciones: data.observaciones,
        veterinarioId,
      },
    });

    return {
      mensaje: 'Tutor creado correctamente',
      tutor,
    };
  }

  async listarTutores(veterinarioId: number) {
    return this.prisma.tutor.findMany({
      where: { veterinarioId },
      orderBy: { fechaCreacion: 'desc' },
    });
  }

  async obtenerTutor(veterinarioId: number, id: number) {
    const tutor = await this.prisma.tutor.findFirst({
      where: {
        id,
        veterinarioId,
      },
    });

    if (!tutor) {
      throw new BadRequestException('Tutor no encontrado');
    }

    return tutor;
  }

  async editarTutor(veterinarioId: number, id: number, data: any) {
    await this.obtenerTutor(veterinarioId, id);

    const tutor = await this.prisma.tutor.update({
      where: { id },
      data: {
        nombre: data.nombre,
        apellido: data.apellido,
        rut: data.rut,
        telefono: data.telefono,
        email: data.email,
        direccion: data.direccion,
        ciudad: data.ciudad,
        observaciones: data.observaciones,
      },
    });

    return {
      mensaje: 'Tutor actualizado correctamente',
      tutor,
    };
  }

  async eliminarTutor(veterinarioId: number, id: number) {
    await this.obtenerTutor(veterinarioId, id);

    await this.prisma.tutor.delete({
      where: { id },
    });

    return {
      mensaje: 'Tutor eliminado correctamente',
    };
  }
}