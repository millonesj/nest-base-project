import {
  Catch,
  ArgumentsHost,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { LoggerService } from '../logger/logger.service';

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
  private logger = new LoggerService();

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const httpException =
      exception instanceof HttpException ? exception.getResponse() : null;
    const error: Record<string, any> = httpException
      ? exception.response.data || exception.response.message
      : exception.message;
    this.logger.customError(
      'AllExceptionsFilter',
      exception.response && exception.response.from
        ? exception.response.from
        : error,
    );

    const status = exception.response
      ? exception.response.status ||
        exception.response.statusCode ||
        exception.status ||
        HttpStatus.INTERNAL_SERVER_ERROR
      : exception.status
      ? exception.status
      : HttpStatus.INTERNAL_SERVER_ERROR;

    let statusDescription = '';

    if (typeof error === 'string') {
      statusDescription = error;
    } else {
      statusDescription = exception.response.statusDescription;
    }
    let detailError;
    if (exception.response) {
      detailError = exception.response.detailError;
    }
    if (status === 400) {
      detailError = 'Los parametros enviados no son válidos.';
    }
    return response.status(status).json({
      status,
      detailError,
      statusDescription: statusDescription,
      path: request.originalUrl,
    });
  }
}
