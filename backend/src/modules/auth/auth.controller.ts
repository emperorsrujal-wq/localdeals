import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('api/v1/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('verify-firebase')
  @HttpCode(200)
  async verifyFirebase(@Body('firebaseToken') firebaseToken: string) {
    try {
      const result = await this.authService.verifyFirebaseToken(firebaseToken);
      return {
        success: true,
        data: result,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  @Post('refresh-token')
  @HttpCode(200)
  async refreshToken(@Body('token') token: string) {
    try {
      const decoded = this.authService.verifyJwtToken(token);
      const newToken = this.authService.createJwtToken({
        sub: decoded.sub,
        email: decoded.email,
        firebaseUid: decoded.firebaseUid,
        role: decoded.role,
      });

      return {
        success: true,
        data: { token: newToken },
      };
    } catch (error) {
      return {
        success: false,
        message: 'Invalid token',
      };
    }
  }
}
