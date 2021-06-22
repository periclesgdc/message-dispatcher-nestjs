import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app_kafka = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: [ 'kafka:9092', 'kafka:9094' ]
      },
      consumer: {
        groupId: 'message-dispatcher-nestjs',
      }
    }
  });

  app_kafka.listen(() => console.log('Kafka consumer service is listening!'));

  const app_web = await NestFactory.create(AppModule);
  await app_web.listen(3000);
}
bootstrap();
