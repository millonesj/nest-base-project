import { Injectable } from '@nestjs/common';
import moment from 'moment-timezone';
import log from 'npmlog';

@Injectable()
export class LoggerService {
  async customInfo(prefix: string, message: Record<string, any>) {
    try {
      const dateFormat = moment().tz(process.env.TIMEZONE).toString();
      log.info(dateFormat, prefix, JSON.stringify(message));
    } catch (error) {
      log.warn('logger', `An error occurred: ` + error);
    }
  }

  async customError(prefix: string, message: Record<string, any>) {
    try {
      const dateFormat = moment().tz(process.env.TIMEZONE).toString();
      log.error(dateFormat, prefix, JSON.stringify(message));
    } catch (error) {
      log.warn('logger', `An error occurred: ` + error);
    }
  }
}
