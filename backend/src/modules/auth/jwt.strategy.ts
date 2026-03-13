import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { getConfig } from '../../config/env';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: getConfig().jwt.secret,
    });
  }

  validate(payload: any) {
    return {
      userId: payload.sub,
      email: payload.email,
      firebaseUid: payload.firebaseUid,
      role: payload.role,
    };
  }
}
