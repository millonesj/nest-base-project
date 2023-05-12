import { Injectable } from '@nestjs/common';
import { AppRequestDTO } from './dto/app.request.dto';
import { LoggerService } from '../../infraestructure/logger/logger.service';
import { AppResponseDTO } from './dto/app.response.dto';

@Injectable()
export class AppService {
  constructor(private readonly logger: LoggerService) {}

  helloWorld(appRequestDTO: AppRequestDTO): AppResponseDTO {
    this.logger.customInfo('AppService.helloWorld', {
      ['START']: appRequestDTO,
    });
    return appRequestDTO;
  }
}
