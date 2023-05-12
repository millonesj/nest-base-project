import * as dotenv from 'dotenv';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import { swaggerConfig } from 'swagger.config';
import { ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from './infraestructure/exception-filters/all-exceptions.filter';
import config from './infraestructure/config/configuration';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);
  const { httpAdapter } = app.get(HttpAdapterHost);
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  const { port } = config();
  SwaggerModule.setup('swagger', app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));

  await app.listen(port);
}
bootstrap();
