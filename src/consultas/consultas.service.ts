import { BadRequestException, Injectable } from '@nestjs/common';
import { EstadoConsulta } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ConsultasService {
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

  async crear(veterinarioId: number, data: any) {
    const mascotaId = Number(data.mascotaId);

    await this.validarMascotaDelVeterinario(veterinarioId, mascotaId);

    const consulta = await this.prisma.consulta.create({
      data: {
        mascotaId,
        veterinarioId,
        tipoConsulta: data.tipoConsulta,
        estado: data.estado ?? EstadoConsulta.BORRADOR,
        fechaConsulta: data.fechaConsulta ? new Date(data.fechaConsulta) : new Date(),

        pesoActual: data.pesoActual ? Number(data.pesoActual) : undefined,
        temperatura: data.temperatura ? Number(data.temperatura) : undefined,
        frecuenciaCardiaca: data.frecuenciaCardiaca ? Number(data.frecuenciaCardiaca) : undefined,
        frecuenciaRespiratoria: data.frecuenciaRespiratoria ? Number(data.frecuenciaRespiratoria) : undefined,
        trc: data.trc,
        mucosas: data.mucosas,

        motivoConsulta: data.motivoConsulta,
        duracionSintomas: data.duracionSintomas,
        anamnesis: data.anamnesis,

        estadoGeneral: data.estadoGeneral,
        sistemaCardiovascular: data.sistemaCardiovascular,
        sistemaRespiratorio: data.sistemaRespiratorio,
        sistemaDigestivo: data.sistemaDigestivo,
        sistemaNeurologico: data.sistemaNeurologico,
        sistemaMusculoEsqueletico: data.sistemaMusculoEsqueletico,
        pielPelaje: data.pielPelaje,

        diagnosticoPresuntivo: data.diagnosticoPresuntivo,
        diagnosticoDefinitivo: data.diagnosticoDefinitivo,
        indicacionesTutor: data.indicacionesTutor,
        fechaControl: data.fechaControl ? new Date(data.fechaControl) : undefined,
        observacionesCierre: data.observacionesCierre,
      },
      include: {
        mascota: {
          include: {
            tutor: true,
          },
        },
        veterinario: {
          select: {
            id: true,
            nombre: true,
            apellido: true,
            email: true,
          },
        },
      },
    });

    return {
      mensaje: 'Consulta creada correctamente',
      consulta,
    };
  }

  async listar(veterinarioId: number) {
    return this.prisma.consulta.findMany({
      where: { veterinarioId },
      orderBy: { fechaConsulta: 'desc' },
      include: {
        mascota: {
          include: {
            tutor: true,
          },
        },
      },
    });
  }

  async obtener(veterinarioId: number, id: number) {
    const consulta = await this.prisma.consulta.findFirst({
      where: {
        id,
        veterinarioId,
      },
      include: {
        mascota: {
          include: {
            tutor: true,
            antecedenteClinico: true,
          },
        },
        veterinario: {
          select: {
            id: true,
            nombre: true,
            apellido: true,
            email: true,
          },
        },
      },
    });

    if (!consulta) {
      throw new BadRequestException('Consulta no encontrada');
    }

    return consulta;
  }

  async actualizar(veterinarioId: number, id: number, data: any) {
    await this.obtener(veterinarioId, id);

    const consulta = await this.prisma.consulta.update({
      where: { id },
      data: {
        tipoConsulta: data.tipoConsulta,
        estado: data.estado,
        fechaConsulta: data.fechaConsulta ? new Date(data.fechaConsulta) : undefined,

        pesoActual: data.pesoActual ? Number(data.pesoActual) : undefined,
        temperatura: data.temperatura ? Number(data.temperatura) : undefined,
        frecuenciaCardiaca: data.frecuenciaCardiaca ? Number(data.frecuenciaCardiaca) : undefined,
        frecuenciaRespiratoria: data.frecuenciaRespiratoria ? Number(data.frecuenciaRespiratoria) : undefined,
        trc: data.trc,
        mucosas: data.mucosas,

        motivoConsulta: data.motivoConsulta,
        duracionSintomas: data.duracionSintomas,
        anamnesis: data.anamnesis,

        estadoGeneral: data.estadoGeneral,
        sistemaCardiovascular: data.sistemaCardiovascular,
        sistemaRespiratorio: data.sistemaRespiratorio,
        sistemaDigestivo: data.sistemaDigestivo,
        sistemaNeurologico: data.sistemaNeurologico,
        sistemaMusculoEsqueletico: data.sistemaMusculoEsqueletico,
        pielPelaje: data.pielPelaje,

        diagnosticoPresuntivo: data.diagnosticoPresuntivo,
        diagnosticoDefinitivo: data.diagnosticoDefinitivo,
        indicacionesTutor: data.indicacionesTutor,
        fechaControl: data.fechaControl ? new Date(data.fechaControl) : undefined,
        observacionesCierre: data.observacionesCierre,
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
      mensaje: 'Consulta actualizada correctamente',
      consulta,
    };
  }
}