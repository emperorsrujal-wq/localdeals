import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { FlyersService } from './flyers.service';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { CurrentUser } from '../../decorators/current-user.decorator';

@Controller('api/v1/flyers')
export class FlyersController {
  constructor(private flyersService: FlyersService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async createFlyer(@CurrentUser() user: any, @Body() data: any) {
    // TODO: Get business ID from user
    const flyer = await this.flyersService.createFlyer('business-id', data);
    return {
      success: true,
      data: flyer,
    };
  }

  @Get('my')
  @UseGuards(JwtAuthGuard)
  async getMyFlyers(@CurrentUser() user: any) {
    // TODO: Get business ID from user
    const flyers = await this.flyersService.getBusinessFlyers('business-id');
    return {
      success: true,
      data: flyers,
    };
  }

  @Get(':id')
  async getFlyerById(@Param('id') flyerId: string) {
    const flyer = await this.flyersService.getFlyerById(flyerId);
    return {
      success: true,
      data: flyer,
    };
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async updateFlyer(@Param('id') flyerId: string, @Body() updates: any) {
    // TODO: Check ownership
    const flyer = await this.flyersService.updateFlyer(flyerId, updates);
    return {
      success: true,
      data: flyer,
    };
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteFlyer(@Param('id') flyerId: string) {
    // TODO: Soft delete
    return {
      success: true,
      message: 'Flyer deleted',
    };
  }

  @Post(':id/publish')
  @UseGuards(JwtAuthGuard)
  async publishFlyer(@Param('id') flyerId: string, @Body('targetRadius') targetRadius: number) {
    await this.flyersService.publishFlyer(flyerId, targetRadius);
    return {
      success: true,
      message: 'Flyer published',
    };
  }

  @Get(':id/analytics')
  @UseGuards(JwtAuthGuard)
  async getAnalytics(@Param('id') flyerId: string) {
    const analytics = await this.flyersService.getFlyerAnalytics(flyerId);
    return {
      success: true,
      data: analytics,
    };
  }
}

@Controller('api/v1/deals')
export class DealsController {
  constructor(private flyersService: FlyersService) {}

  @Get()
  async getNearbyDeals(
    @Query('lat') lat: string,
    @Query('lng') lng: string,
    @Query('radius') radius: string,
    @Query('category') category?: string,
  ) {
    const deals = await this.flyersService.getNearbyDeals(
      parseFloat(lat),
      parseFloat(lng),
      parseInt(radius) || 5,
      category,
    );
    return {
      success: true,
      data: deals,
    };
  }

  @Get('map')
  async getDealsForMap(@Query('bounds') bounds: string) {
    // TODO: Parse bounds
    const deals = await this.flyersService.getDealsInBounds({
      north: 0,
      south: 0,
      east: 0,
      west: 0,
    });
    return {
      success: true,
      data: deals,
    };
  }

  @Get('search')
  async searchDeals(
    @Query('q') query: string,
    @Query('lat') lat?: string,
    @Query('lng') lng?: string,
  ) {
    const results = await this.flyersService.searchDeals(
      query,
      lat ? parseFloat(lat) : undefined,
      lng ? parseFloat(lng) : undefined,
    );
    return {
      success: true,
      data: results,
    };
  }

  @Post(':id/save')
  @UseGuards(JwtAuthGuard)
  async saveDeal(@Param('id') flyerId: string, @CurrentUser() user: any) {
    await this.flyersService.recordSave(flyerId, user.userId);
    return {
      success: true,
      message: 'Deal saved',
    };
  }
}
