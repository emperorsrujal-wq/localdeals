import { Controller, Get, Put, Post, Body, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { CurrentUser } from '../../decorators/current-user.decorator';

@Controller('api/v1/users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async getCurrentUser(@CurrentUser() user: any) {
    const userData = await this.usersService.getUserById(user.userId);
    return {
      success: true,
      data: userData,
    };
  }

  @Put('profile')
  @UseGuards(JwtAuthGuard)
  async updateProfile(@CurrentUser() user: any, @Body() updateData: any) {
    const updated = await this.usersService.updateUserProfile(user.userId, updateData);
    return {
      success: true,
      data: updated,
    };
  }

  @Post('location')
  @UseGuards(JwtAuthGuard)
  async updateLocation(@CurrentUser() user: any, @Body() { lat, lng }: any) {
    await this.usersService.updateUserLocation(user.userId, lat, lng);
    return {
      success: true,
      message: 'Location updated',
    };
  }

  @Post('fcm-token')
  @UseGuards(JwtAuthGuard)
  async saveFcmToken(@CurrentUser() user: any, @Body('fcmToken') fcmToken: string) {
    await this.usersService.saveFcmToken(user.userId, fcmToken);
    return {
      success: true,
      message: 'FCM token saved',
    };
  }
}
