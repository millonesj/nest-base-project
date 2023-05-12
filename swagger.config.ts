import { DocumentBuilder, OpenAPIObject } from '@nestjs/swagger';

export const swaggerConfig: Omit<OpenAPIObject, 'paths'> = new DocumentBuilder()
  .setTitle('API de Agente Floid')
  .setDescription('API para obtener información de los servicios de FLOID.')
  .setVersion('1.0')
  .addBearerAuth()
  .build();
