import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategyService extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'vetcorp_secret_dev',
    });
  }

  async validate(payload: any) {
    return {
      id: payload.sub,
      email: payload.email,
      rol: payload.rol,
    };
  }
}
