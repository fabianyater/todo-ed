import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('ToDo API')
    .setDescription('Descripción api ToDo')
    .setVersion('1.0')
    .addTag('ToDo')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/', app, document);

  app.use(cookieParser())

  app.enableCors({
    origin: 'http://localhost:3001',
    credentials: true
  })

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
