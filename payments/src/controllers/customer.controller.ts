import { Controller } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { EventPattern, Payload } from '@nestjs/microservices';
import { KafkaConsumer } from 'src/infra/kafka/kafka';

type CustomerData = {
  id: string;
  name: string;
  email: string;
  cpfCnpj: string;
  createdAt: Date;
};

@Controller()
export class CustomerController {
  constructor(protected kafkaConsumer: KafkaConsumer) {
    kafkaConsumer.connect({
      brokers: ['localhost:9092'],
      groupId: 'payment-consumer',
      subscribe: {
        fromBeginning: true,
        topic: 'customer',
      },
    });
  }

  @OnEvent('customer')
  async handleCustomerMessage(data: any) {
    console.log(data)
  }
}
