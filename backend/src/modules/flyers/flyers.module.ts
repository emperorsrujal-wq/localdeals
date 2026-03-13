import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FlyersService } from './flyers.service';
import { FlyersController, DealsController } from './flyers.controller';
import { Flyer } from './flyer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Flyer])],
  providers: [FlyersService],
  controllers: [FlyersController, DealsController],
  exports: [FlyersService],
})
export class FlyersModule {}
