import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { useContainer } from 'class-validator';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // enable dependency injection for class-validator
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  // enable global validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  // configure swagger api documentation
  const config = new DocumentBuilder()
    .setTitle('Slash Commerce 1.0')
    .setDescription('Slash Commerce API Documentation')
    .setVersion('1.0')
    .addTag('Auth')
    .addTag('Users')
    .addTag('Stores')
    .addTag('Products')
    .addTag('Carts')
    .addTag('Uploads')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // start application
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
