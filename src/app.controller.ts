import { Body, Controller, Get, Post } from '@nestjs/common';
import { Client, ClientKafka, MessagePattern, Payload, Transport } from '@nestjs/microservices';
import { AppService } from './app.service';
import { Message } from './entity/Message';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Client({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'kafkaSample',
        brokers: [ 'kafka:9092', 'kafka:9094' ],
      },
      consumer: {
        groupId: 'message-dispatcher-nestjs'
      }
    }
  })
  client: ClientKafka;

  async onModuleInit() {
    this.client.subscribeToResponseOf('message-dispatcher-receiving-topic');
    await this.client.connect();
  }

  @Get()
  getHello() {
    return this.client.send('message-dispatcher-receiving-topic', 'Hello Kafka');
  }

  @Post()
  async sendMessage(@Body() message: Message) {
    this.client.subscribeToResponseOf(message.event);
    await this.client.connect();

    let kafkaResponse = this.client.send(message.event, message.message_body);

    return kafkaResponse.toPromise();

    // return 'The object '+JSON.stringify(message.message_body)+' was sent to topic '+message.event;
  }

  @MessagePattern('message-dispatcher-sending-topic')
  recieveMessage(@Payload() message) {
    console.log(message.value);
    return this.appService.getHello();
  }
}
