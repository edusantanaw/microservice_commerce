import { Controller, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { CustomerDTO } from 'src/dtos/customer.dto';
import { KafkaSevice } from 'src/infra/kafka/kafka';
import { CustomerService } from 'src/services/customer.service';

@Controller()
export class CustomerController {
  constructor(
    protected kafkaConsumer: KafkaSevice,
    protected logger: Logger,
    protected customerService: CustomerService,
  ) {
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
  async handleCustomerMessage(data: CustomerDTO) {
    try {
      const customer = await this.customerService.create(data);
      this.logger.log(`Cliente inserido com sucesso: ${customer.id}`);
    } catch (error) {
      this.logger.error(`Falha ao criar o cliente: ${data.id}`);
    }
  }
}
