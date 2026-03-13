import { Controller, Get, Put, Post, Body, Param, Query, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { CurrentUser } from '../../decorators/current-user.decorator';

@Controller('api/v1/admin')
@UseGuards(JwtAuthGuard)
export class AdminController {
  constructor(private adminService: AdminService) {}

  @Get('dashboard')
  async getDashboard() {
    const dashboard = await this.adminService.getDashboardMetrics();
    return {
      success: true,
      data: dashboard,
    };
  }

  @Get('businesses/pending')
  async getPendingBusinesses(@Query('limit') limit = 20, @Query('offset') offset = 0) {
    const result = await this.adminService.getPendingBusinesses(limit, offset);
    return {
      success: true,
      data: result.data,
      total: result.total,
    };
  }

  @Put('businesses/:id/approve')
  async approveBusiness(@Param('id') businessId: string) {
    await this.adminService.approveBusiness(businessId);
    return {
      success: true,
      message: 'Business approved',
    };
  }

  @Put('businesses/:id/reject')
  async rejectBusiness(@Param('id') businessId: string, @Body('reason') reason: string) {
    await this.adminService.rejectBusiness(businessId, reason);
    return {
      success: true,
      message: 'Business rejected',
    };
  }

  @Get('content/flagged')
  async getFlaggedContent(@Query('limit') limit = 20) {
    const content = await this.adminService.getFlaggedContent(limit);
    return {
      success: true,
      data: content,
    };
  }

  @Put('content/:id/approve')
  async approveContent(@Param('id') contentId: string) {
    await this.adminService.approveContent(contentId);
    return {
      success: true,
      message: 'Content approved',
    };
  }

  @Put('content/:id/reject')
  async rejectContent(@Param('id') contentId: string, @Body('reason') reason: string) {
    await this.adminService.rejectContent(contentId, reason);
    return {
      success: true,
      message: 'Content rejected',
    };
  }

  @Get('analytics/overview')
  async getAnalyticsOverview() {
    const analytics = await this.adminService.getAnalyticsOverview();
    return {
      success: true,
      data: analytics,
    };
  }

  @Get('analytics/users')
  async getUserAnalytics(@Query('period') period = '30d') {
    const analytics = await this.adminService.getUserAnalytics(period);
    return {
      success: true,
      data: analytics,
    };
  }

  @Post('notifications/broadcast')
  async broadcastNotification(
    @Body('title') title: string,
    @Body('message') message: string,
    @Body('targetSegment') targetSegment?: string,
  ) {
    await this.adminService.broadcastNotification(title, message, targetSegment);
    return {
      success: true,
      message: 'Notification broadcast sent',
    };
  }
}
