import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BusinessesService } from './businesses.service';
import { BusinessesController } from './businesses.controller';
import { Business } from './business.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Business])],
  providers: [BusinessesService],
  controllers: [BusinessesController],
  exports: [BusinessesService],
})
export class BusinessesModule {}
