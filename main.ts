import { NestFactory } from '@nestjs/core';
import { Logger, Module } from '@nestjs/common';
import { Logger as PLogger, LoggerModule } from 'nestjs-pino';
import { Params } from 'nestjs-pino';

const nestJsPinoConfig = {
   // The LoggerModule config goes here
};

// You should reproduce your bug in the function below
function example() {
  const logger = new Logger('Example');
  logger.log('Example log statement');
}

(async function() {
  @Module({imports: [LoggerModule.forRoot(nestJsPinoConfig)]})
 class AppModule {}

  const app = await NestFactory.create(AppModule);
  app.useLogger(app.get(PLogger));
  example();
})();
