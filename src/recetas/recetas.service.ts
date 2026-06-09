import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class RecetasService {
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

  async obtenerRecetaDelVeterinario(veterinarioId: number, recetaId: number) {
    const receta = await this.prisma.receta.findFirst({
      where: {
        id: recetaId,
        consulta: {
          veterinarioId,
        },
      },
      include: {
        consulta: {
          include: {
            mascota: {
              include: {
                tutor: true,
              },
            },
            tratamientoMedicamentos: true,
          },
        },
      },
    });

    if (!receta) {
      throw new BadRequestException('Receta no encontrada');
    }

    return receta;
  }

  async crear(veterinarioId: number, data: any) {
    const consultaId = Number(data.consultaId);

    await this.validarConsultaDelVeterinario(veterinarioId, consultaId);

    const existe = await this.prisma.receta.findUnique({
      where: { consultaId },
    });

    if (existe) {
      throw new BadRequestException('Esta consulta ya tiene una receta creada');
    }

    const receta = await this.prisma.receta.create({
      data: {
        consultaId,
        indicaciones: data.indicaciones,
        observaciones: data.observaciones,
      },
      include: {
        consulta: {
          include: {
            mascota: {
              include: {
                tutor: true,
              },
            },
            tratamientoMedicamentos: true,
          },
        },
      },
    });

    return {
      mensaje: 'Receta creada correctamente',
      receta,
    };
  }

  async listar(veterinarioId: number) {
    return this.prisma.receta.findMany({
      where: {
        consulta: {
          veterinarioId,
        },
      },
      orderBy: {
        fechaCreacion: 'desc',
      },
      include: {
        consulta: {
          include: {
            mascota: {
              include: {
                tutor: true,
              },
            },
          },
        },
      },
    });
  }

  async obtenerPorConsulta(veterinarioId: number, consultaId: number) {
    await this.validarConsultaDelVeterinario(veterinarioId, consultaId);

    const receta = await this.prisma.receta.findUnique({
      where: { consultaId },
      include: {
        consulta: {
          include: {
            mascota: {
              include: {
                tutor: true,
              },
            },
            tratamientoMedicamentos: true,
            veterinario: {
              select: {
                id: true,
                nombre: true,
                apellido: true,
                email: true,
              },
            },
          },
        },
      },
    });

    if (!receta) {
      throw new BadRequestException('No existe receta para esta consulta');
    }

    return receta;
  }

  async actualizar(veterinarioId: number, recetaId: number, data: any) {
    await this.obtenerRecetaDelVeterinario(veterinarioId, recetaId);

    const receta = await this.prisma.receta.update({
      where: { id: recetaId },
      data: {
        indicaciones: data.indicaciones,
        observaciones: data.observaciones,
      },
    });

    return {
      mensaje: 'Receta actualizada correctamente',
      receta,
    };
  }

  async emitir(veterinarioId: number, recetaId: number) {
    await this.obtenerRecetaDelVeterinario(veterinarioId, recetaId);

    const numero = `REC-${new Date().getFullYear()}-${String(recetaId).padStart(6, '0')}`;

    const receta = await this.prisma.receta.update({
      where: { id: recetaId },
      data: {
        emitida: true,
        fechaEmision: new Date(),
        numero,
      },
    });

    return {
      mensaje: 'Receta emitida correctamente',
      receta,
    };
  }
}