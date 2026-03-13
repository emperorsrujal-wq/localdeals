import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { getConfig } from './config/env';

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
    // TODO: Add feature modules here
    // AuthModule,
    // UsersModule,
    // BusinessesModule,
    // FlyersModule,
    // AdminModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
