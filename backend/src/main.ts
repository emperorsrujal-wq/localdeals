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

  // Use PORT from environment (Cloud Run sets PORT=8080) or fall back to config
  const port = process.env.PORT ? parseInt(process.env.PORT, 10) : config.port;

  // Start server
  await app.listen(port, '0.0.0.0', () => {
    console.log(`✅ LocalDeals API running on port ${port} [${config.nodeEnv}]`);
  });
}

bootstrap().catch(err => {
  console.error('Failed to start application:', err);
  process.exit(1);
});
