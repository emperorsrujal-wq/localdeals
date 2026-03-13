import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { getConfig } from './config/env';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = getConfig();

  // Enable CORS
  app.enableCors({
    origin: config.cors.origin,
    credentials: true,
  });

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Start server
  await app.listen(config.port, () => {
    console.log(`LocalDeals API running on port ${config.port} [${config.nodeEnv}]`);
  });
}

bootstrap().catch(err => {
  console.error('Failed to start application:', err);
  process.exit(1);
});
