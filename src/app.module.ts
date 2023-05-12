import { Module } from '@nestjs/common';
import { AppService } from './domain/app/app.service';
import { AgentController } from './application/app.controller';
import { LoggerService } from './infraestructure/logger/logger.service';
import { ConfigModule } from '@nestjs/config';
import configuration from './infraestructure/config/configuration';
import { TerminusModule } from '@nestjs/terminus';

@Module({
  imports: [
    TerminusModule,
    ConfigModule.forRoot({
      load: [configuration],
    }),
  ],
  controllers: [AgentController],
  providers: [AppService, LoggerService],
  exports: [],
})
export class AppModule {}
