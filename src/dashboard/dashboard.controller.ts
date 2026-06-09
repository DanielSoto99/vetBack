import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { RolUsuario } from '@prisma/client';
import { DashboardService } from './dashboard.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';

@Controller('dashboard')
@UseGuards(JwtAuthGuard)
export class DashboardController {
  constructor(private dashboardService: DashboardService) {}

  @Get('resumen')
  resumen(@Req() req: any) {
    return this.dashboardService.resumen(req.user.id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RolUsuario.SUPER_ADMIN)
  @Get('admin/resumen')
  resumenAdmin() {
    return this.dashboardService.resumenAdmin();
  }
}