import { Controller } from '@nestjs/common';
import { Client, ClientKafka, MessagePattern, Payload, Transport } from '@nestjs/microservices';

type CustomerData = {

}

@Controller()
export class CustomerController {
    @Client({
        transport: Transport.KAFKA,
        options: {
          client: {
            brokers: ['localhost:9092'],
          },
          consumer: {
           groupId: 'payments-group'
          },
        },
    })
      client: ClientKafka;
      
  async onModuleInit() {
    this.client.subscribeToResponseOf('customer');
    await this.client.connect();
  }

  @MessagePattern('customer')
  async customer(@Payload() data: CustomerData){
    console.log(data)
  }
}
