import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilitar CORS para desarrollo local y producción
  app.enableCors({
    origin: [
      'http://localhost:3000',             // Frontend local
      'https://tu-proyecto.vercel.app'     // Frontend en Vercel (reemplaza con tu dominio real)
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true
  });

  // Escuchar en el puerto definido por Render o por defecto 3000
  const port = parseInt(process.env.PORT ?? '3000', 10);
  await app.listen(port);
  console.log(`🚀 App running on http://localhost:${port}`);
}

bootstrap();
