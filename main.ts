import { NestFactory } from '@nestjs/core';
import { Logger, Module } from '@nestjs/common';
import { Logger as PLogger, LoggerModule } from 'nestjs-pino';
import { Params } from 'nestjs-pino';

// You should reproduce your bug in the function below
function example() {
  const logger = new Logger('Example');
  logger.log(
    { works: 'working value' },
    'When passing an object as the first argument and a string as the second argument the log includes both the string and object.'
  );
  logger.log(
    'When passing a string as the first argument and an object as the second argument the log does not include the object.',
    { notIncluded: 'not included' }
  );
  logger.log(
    'When passing a string as the first and second argument the log only includes the first string',
    'This string is not included'
  );
  logger.log(
    { firstObject: 'When passing an object as the first and second argument it will include the first object\'s keys directly in the log object and the second object as an object under the msg key' },
    { secondObject: 'this is included in the msg key as an object' },
  );
  logger.log(
    { thisCase: 'When passing three objects in the arguments, it will log the first object\'s keys directly in the log object, the second object will be included as a JSON formatted string, and the third object is not included at all' },
    { secondObject: 'this is included in the msg key as a string' },
    { thirdObject: 'but this is not included at all' },
  );
  logger.log(
    { thisCase: 'When passing an three objects in the arguments, it will do the same as with three objects but will also include the fourth object in the msg, while still skipping over the third argument.' },
    { secondObject: 'this is included in the msg key as a string' },
    { thirdObject: 'this is still not included' },
    { fourthObject: 'but this is included in the msg key as a string right after the secondObject' },
  );
}

(async function() {
  @Module({imports: [LoggerModule.forRoot()]})
 class AppModule {}

  const app = await NestFactory.create(AppModule);
  app.useLogger(app.get(PLogger));
  example();
})();
