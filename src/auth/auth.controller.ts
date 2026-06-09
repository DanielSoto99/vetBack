import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('crear-super-admin')
  crearSuperAdmin() {
    return this.authService.crearSuperAdmin();
  }

  @Post('login')
  login(@Body() body: { email: string; password: string }) {
    return this.authService.login(body.email, body.password);
  }

  @UseGuards(JwtAuthGuard)
  @Post('cambiar-password')
  cambiarPassword(
    @Req() req: any,
    @Body() body: { passwordActual: string; passwordNueva: string },
  ) {
    return this.authService.cambiarPassword(
      req.user.id,
      body.passwordActual,
      body.passwordNueva,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  me(@Req() req: any) {
    return this.authService.me(req.user.id);
  }
}
