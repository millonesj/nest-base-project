import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { AppService } from '../domain/app/app.service';
import { AppRequestDTO } from '../domain/app/dto/app.request.dto';
import { Response } from 'express';
import { CustomException } from '../infraestructure/exceptions/custom-exception';
import { LoggerService } from '../infraestructure/logger/logger.service';
import { ApiResponse } from '@nestjs/swagger';
import { AppResponseDTO } from '../domain/app/dto/app.response.dto';
import {
  HealthCheck,
  HealthCheckService,
  MemoryHealthIndicator,
} from '@nestjs/terminus';

@Controller('/api/')
export class AgentController {
  constructor(
    private readonly appService: AppService,
    private readonly health: HealthCheckService,
    private readonly logger: LoggerService,
    private readonly memory: MemoryHealthIndicator,
  ) {}

  @Get('/health/liveness')
  @HealthCheck()
  check() {
    return this.health.check([
      async () => this.memory.checkHeap('memory_heap', 150 * 1024 * 1024),
      async () => this.memory.checkRSS('memory_rss', 3000 * 1024 * 1024),
    ]);
  }

  @Post()
  @ApiResponse({
    status: 200,
    type: AppResponseDTO,
  })
  async helloWorld(
    @Res() res: Response,
    @Req() req: Request,
    @Body() appRequestDTO: AppRequestDTO,
  ): Promise<Response> {
    try {
      this.logger.customInfo('AppController.helloWorld', {
        ['START']: req.url,
        appRequestDTO,
      });

      return res.status(200).json(this.appService.helloWorld(appRequestDTO));
    } catch (error) {
      this.logger.customError('AppController.helloWorld', {
        error: error.message,
      });
      if (error?.status === 500) {
        throw new CustomException(
          'Lo siento, ha ocurrido un error en el servidor.',
          error.status,
          null,
        );
      }
      throw new CustomException(error, HttpStatus.BAD_REQUEST, null);
    }
  }
}
