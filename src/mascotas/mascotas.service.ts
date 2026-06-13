import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MascotasService {
  constructor(private prisma: PrismaService) {}

  async validarTutorDelVeterinario(veterinarioId: number, tutorId: number) {
    const tutor = await this.prisma.tutor.findFirst({
      where: {
        id: tutorId,
        veterinarioId,
      },
    });

    if (!tutor) {
      throw new BadRequestException(
        'Tutor no encontrado o no pertenece al veterinario',
      );
    }

    return tutor;
  }

  async crearMascota(veterinarioId: number, data: any) {
    await this.validarTutorDelVeterinario(veterinarioId, Number(data.tutorId));

    const mascota = await this.prisma.mascota.create({
      data: {
        nombre: data.nombre,
        especieId: Number(data.especieId),
        razaId: data.razaId ? Number(data.razaId) : undefined,
        sexo: data.sexo,
        fechaNacimiento: data.fechaNacimiento
          ? new Date(data.fechaNacimiento)
          : undefined,
        pesoActual: data.pesoActual ? Number(data.pesoActual) : undefined,
        colorPelaje: data.colorPelaje,
        microchip: data.microchip,
        esterilizado: data.esterilizado ?? false,
        observaciones: data.observaciones,
        tutorId: Number(data.tutorId),
      },
      include: {
        tutor: true,
        especie: true,
        raza: true,
      },
    });

    return {
      mensaje: 'Mascota creada correctamente',
      mascota,
    };
  }

  async listarMascotas(veterinarioId: number) {
    return this.prisma.mascota.findMany({
      where: {
        tutor: {
          veterinarioId,
        },
      },
      include: {
        tutor: true,
        especie: true,
        raza: true,
      },
      orderBy: { fechaCreacion: 'desc' },
    });
  }

  async obtenerMascota(veterinarioId: number, id: number) {
    const mascota = await this.prisma.mascota.findFirst({
      where: {
        id,
        tutor: {
          veterinarioId,
        },
      },
      include: {
        tutor: true,
        especie: true,
        raza: true,
      },
    });

    if (!mascota) {
      throw new BadRequestException('Mascota no encontrada');
    }

    return mascota;
  }

  async editarMascota(veterinarioId: number, id: number, data: any) {
    await this.obtenerMascota(veterinarioId, id);

    if (data.tutorId) {
      await this.validarTutorDelVeterinario(
        veterinarioId,
        Number(data.tutorId),
      );
    }

    const mascota = await this.prisma.mascota.update({
      where: { id },
      data: {
        nombre: data.nombre,
        especieId: data.especieId ? Number(data.especieId) : undefined,
        razaId: data.razaId ? Number(data.razaId) : undefined,
        sexo: data.sexo,
        fechaNacimiento: data.fechaNacimiento
          ? new Date(data.fechaNacimiento)
          : undefined,
        pesoActual: data.pesoActual ? Number(data.pesoActual) : undefined,
        colorPelaje: data.colorPelaje,
        microchip: data.microchip,
        esterilizado: data.esterilizado,
        observaciones: data.observaciones,
        tutorId: data.tutorId ? Number(data.tutorId) : undefined,
      },
      include: {
        tutor: true,
        especie: true,
        raza: true,
      },
    });

    return {
      mensaje: 'Mascota actualizada correctamente',
      mascota,
    };
  }

  async eliminarMascota(veterinarioId: number, id: number) {
    await this.obtenerMascota(veterinarioId, id);

    await this.prisma.mascota.delete({
      where: { id },
    });

    return {
      mensaje: 'Mascota eliminada correctamente',
    };
  }

  async fichaCompleta(veterinarioId: number, id: number) {
    const mascota = await this.prisma.mascota.findFirst({
      where: {
        id,
        tutor: {
          veterinarioId,
        },
      },
      include: {
        tutor: true,
        especie: true,
        raza: true,
        antecedenteClinico: true,
        vacunas: {
          orderBy: {
            fechaAplicacion: 'desc',
          },
        },
        desparasitaciones: {
          orderBy: {
            fechaAplicacion: 'desc',
          },
        },
        consultas: {
          orderBy: {
            fechaConsulta: 'desc',
          },
          include: {
            tratamientoMedicamentos: true,
            examenesSolicitados: true,
            receta: true,
            archivos: true,
          },
        },
        archivos: {
          orderBy: {
            fechaCreacion: 'desc',
          },
        },
        citas: {
          orderBy: {
            fechaInicio: 'asc',
          },
        },
      },
    });

    if (!mascota) {
      throw new BadRequestException('Mascota no encontrada');
    }

    const ahora = new Date();

    const proximaCita =
      mascota.citas.find((cita) => new Date(cita.fechaInicio) >= ahora) ??
      null;

    return {
      mascota: {
        id: mascota.id,
        nombre: mascota.nombre,
        especieId: mascota.especieId,
        especie: mascota.especie?.nombre,
        razaId: mascota.razaId,
        raza: mascota.raza?.nombre,
        sexo: mascota.sexo,
        fechaNacimiento: mascota.fechaNacimiento,
        pesoActual: mascota.pesoActual,
        colorPelaje: mascota.colorPelaje,
        microchip: mascota.microchip,
        esterilizado: mascota.esterilizado,
        observaciones: mascota.observaciones,
        fechaCreacion: mascota.fechaCreacion,
      },
      tutor: mascota.tutor,
      antecedenteClinico: mascota.antecedenteClinico,
      vacunas: mascota.vacunas,
      desparasitaciones: mascota.desparasitaciones,
      consultas: mascota.consultas,
      archivos: mascota.archivos,
      proximaCita,
      resumen: {
        totalConsultas: mascota.consultas.length,
        totalVacunas: mascota.vacunas.length,
        totalDesparasitaciones: mascota.desparasitaciones.length,
        totalArchivos: mascota.archivos.length,
        tieneAlergias: Boolean(mascota.antecedenteClinico?.alergias),
      },
    };
  }
}