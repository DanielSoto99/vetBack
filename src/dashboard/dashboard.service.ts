import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DashboardService {
  constructor(private prisma: PrismaService) {}

  async resumen(veterinarioId: number) {
    const ahora = new Date();

    const inicioMes = new Date(ahora.getFullYear(), ahora.getMonth(), 1);
    const finMes = new Date(ahora.getFullYear(), ahora.getMonth() + 1, 1);

    const inicioHoy = new Date(ahora);
    inicioHoy.setHours(0, 0, 0, 0);

    const finHoy = new Date(ahora);
    finHoy.setHours(23, 59, 59, 999);

    const en30Dias = new Date(ahora);
    en30Dias.setDate(en30Dias.getDate() + 30);

    const [
      totalTutores,
      totalMascotas,
      consultasMes,
      citasHoy,
      vacunasProximas,
      vacunasVencidas,
      desparasitacionesProximas,
      desparasitacionesVencidas,
      ultimasConsultas,
      pacientesRecientes,
    ] = await Promise.all([
      this.prisma.tutor.count({
        where: { veterinarioId },
      }),

      this.prisma.mascota.count({
        where: {
          tutor: { veterinarioId },
        },
      }),

      this.prisma.consulta.count({
        where: {
          veterinarioId,
          fechaConsulta: {
            gte: inicioMes,
            lt: finMes,
          },
        },
      }),

      this.prisma.cita.findMany({
        where: {
          veterinarioId,
          fechaInicio: {
            gte: inicioHoy,
            lte: finHoy,
          },
        },
        orderBy: { fechaInicio: 'asc' },
        include: {
          mascota: {
            include: {
              especie: true,
              tutor: true,
            },
          },
          tutor: true,
        },
      }),

      this.prisma.vacuna.findMany({
        where: {
          estado: 'VENCIDA',
          fechaProximaDosis: {
            not: null,
            gte: ahora,
            lte: en30Dias,
          },
          mascota: {
            tutor: { veterinarioId },
          },
        },
        orderBy: { fechaProximaDosis: 'asc' },
        include: {
          mascota: {
            include: {
              tutor: true,
              especie: true,
            },
          },
        },
      }),

      this.prisma.vacuna.findMany({
        where: {
          estado: 'VENCIDA',
          fechaProximaDosis: {
            not: null,
            lt: ahora,
          },
          mascota: {
            tutor: { veterinarioId },
          },
        },
        orderBy: { fechaProximaDosis: 'asc' },
        include: {
          mascota: {
            include: {
              tutor: true,
              especie: true,
            },
          },
        },
      }),

      this.prisma.desparasitacion.findMany({
        where: {
          estado: 'VIGENTE',
          fechaProximaDosis: {
            not: null,
            gte: ahora,
            lte: en30Dias,
          },
          mascota: {
            tutor: { veterinarioId },
          },
        },
        orderBy: { fechaProximaDosis: 'asc' },
        include: {
          mascota: {
            include: {
              tutor: true,
              especie: true,
            },
          },
        },
      }),

      this.prisma.desparasitacion.findMany({
        where: {
          estado: 'VIGENTE',
          fechaProximaDosis: {
            not: null,
            lt: ahora,
          },
          mascota: {
            tutor: { veterinarioId },
          },
        },
        orderBy: { fechaProximaDosis: 'asc' },
        include: {
          mascota: {
            include: {
              tutor: true,
              especie: true,
            },
          },
        },
      }),

      this.prisma.consulta.findMany({
        where: { veterinarioId },
        orderBy: { fechaConsulta: 'desc' },
        take: 5,
        include: {
          mascota: {
            include: {
              tutor: true,
              especie: true,
            },
          },
        },
      }),

      this.prisma.mascota.findMany({
        where: {
          tutor: { veterinarioId },
        },
        orderBy: { fechaCreacion: 'desc' },
        take: 5,
        include: {
          tutor: true,
          especie: true,
          antecedenteClinico: true,
        },
      }),
    ]);

    return {
      kpis: {
        totalTutores,
        totalMascotas,
        consultasMes,
        citasHoy: citasHoy.length,
        vacunasProximas: vacunasProximas.length,
        vacunasVencidas: vacunasVencidas.length,
        desparasitacionesProximas: desparasitacionesProximas.length,
        desparasitacionesVencidas: desparasitacionesVencidas.length,
      },
      citasHoy,
      alertasClinicas: {
        vacunasProximas,
        vacunasVencidas,
        desparasitacionesProximas,
        desparasitacionesVencidas,
      },
      ultimasConsultas,
      pacientesRecientes,
    };
  }

  async resumenAdmin() {
    const [
      totalVeterinarios,
      veterinariosActivos,
      veterinariosInactivos,
      totalTutores,
      totalMascotas,
      totalConsultas,
      totalRecetas,
      ultimosVeterinarios,
    ] = await Promise.all([
      this.prisma.usuario.count({
        where: { rol: 'VETERINARIO' },
      }),

      this.prisma.usuario.count({
        where: {
          rol: 'VETERINARIO',
          activo: true,
        },
      }),

      this.prisma.usuario.count({
        where: {
          rol: 'VETERINARIO',
          activo: false,
        },
      }),

      this.prisma.tutor.count(),

      this.prisma.mascota.count(),

      this.prisma.consulta.count(),

      this.prisma.receta.count(),

      this.prisma.usuario.findMany({
        where: { rol: 'VETERINARIO' },
        orderBy: { fechaCreacion: 'desc' },
        take: 5,
        select: {
          id: true,
          nombre: true,
          apellido: true,
          email: true,
          activo: true,
          debeCambiarPassword: true,
          ultimoLogin: true,
          fechaCreacion: true,
        },
      }),
    ]);

    return {
      kpis: {
        totalVeterinarios,
        veterinariosActivos,
        veterinariosInactivos,
        totalTutores,
        totalMascotas,
        totalConsultas,
        totalRecetas,
      },
      ultimosVeterinarios,
    };
  }
}