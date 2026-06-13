import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { TutoresModule } from './tutores/tutores.module';
import { MascotasModule } from './mascotas/mascotas.module';
import { AntecedentesModule } from './antecedentes/antecedentes.module';
import { ConsultasModule } from './consultas/consultas.module';
import { VacunasModule } from './vacunas/vacunas.module';
import { DesparasitacionesModule } from './desparasitaciones/desparasitaciones.module';
import { TratamientosModule } from './tratamientos/tratamientos.module';
import { ExamenesModule } from './examenes/examenes.module';
import { ArchivosModule } from './archivos/archivos.module';
import { RecetasModule } from './recetas/recetas.module';
import { AgendaModule } from './agenda/agenda.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { EspeciesModule } from './especies/especies.module';
import { RazasModule } from './razas/razas.module';

@Module({
  imports: [PrismaModule, AuthModule, UsuariosModule, TutoresModule, MascotasModule, AntecedentesModule, ConsultasModule, VacunasModule, DesparasitacionesModule, TratamientosModule, ExamenesModule, ArchivosModule, RecetasModule, AgendaModule, DashboardModule, EspeciesModule, RazasModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}