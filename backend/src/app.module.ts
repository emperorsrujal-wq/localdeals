import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { getConfig } from './config/env';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { BusinessesModule } from './modules/businesses/businesses.module';
import { FlyersModule } from './modules/flyers/flyers.module';
import { AdminModule } from './modules/admin/admin.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: getConfig().database.host,
      port: getConfig().database.port,
      username: getConfig().database.user,
      password: getConfig().database.password,
      database: getConfig().database.name,
      entities: ['src/**/*.entity.ts'],
      migrations: ['src/migrations/*.ts'],
      synchronize: true, // Set to false in production
      logging: true,
    }),
    AuthModule,
    UsersModule,
    BusinessesModule,
    FlyersModule,
    AdminModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
