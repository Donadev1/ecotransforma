import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

app.enableCors({
  origin: [
    'http://localhost:3000',             // desarrollo local
    'https://tu-proyecto.vercel.app'     // producción en Vercel
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  credentials: true
});
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
