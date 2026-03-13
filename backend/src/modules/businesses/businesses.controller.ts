import { Controller, Get, Post, Put, Body, Param, UseGuards } from '@nestjs/common';
import { BusinessesService } from './businesses.service';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { CurrentUser } from '../../decorators/current-user.decorator';

@Controller('api/v1/businesses')
export class BusinessesController {
  constructor(private businessesService: BusinessesService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async createBusiness(@CurrentUser() user: any, @Body() data: any) {
    const business = await this.businessesService.createBusiness(user.userId, data);
    return {
      success: true,
      data: business,
    };
  }

  @Get('my')
  @UseGuards(JwtAuthGuard)
  async getMyBusinesses(@CurrentUser() user: any) {
    const businesses = await this.businessesService.getBusinessByOwnerId(user.userId);
    return {
      success: true,
      data: businesses,
    };
  }

  @Get(':id')
  async getBusinessById(@Param('id') businessId: string) {
    const business = await this.businessesService.getBusinessById(businessId);
    return {
      success: true,
      data: business,
    };
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async updateBusiness(
    @Param('id') businessId: string,
    @CurrentUser() user: any,
    @Body() updates: any,
  ) {
    // TODO: Check ownership
    const business = await this.businessesService.updateBusiness(businessId, updates);
    return {
      success: true,
      data: business,
    };
  }

  @Post(':id/verify')
  @UseGuards(JwtAuthGuard)
  async submitVerification(
    @Param('id') businessId: string,
    @Body('docUrls') docUrls: string[],
  ) {
    await this.businessesService.submitVerification(businessId, docUrls);
    return {
      success: true,
      message: 'Verification documents submitted',
    };
  }
}
