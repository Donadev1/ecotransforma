import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common'; // ← Agregar esta importación

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ← AGREGAR ESTA CONFIGURACIÓN
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  // Habilitar CORS para desarrollo local y producción
  app.enableCors({
    origin: [
      'http://localhost:3000',
      'https://tu-proyecto.vercel.app'
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true
  });

  const port = parseInt(process.env.PORT ?? '3000', 10);
  await app.listen(port);
  console.log(`🚀 App running on http://localhost:${port}`);
}

bootstrap();