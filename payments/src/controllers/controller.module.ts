import { Module } from '@nestjs/common';
import { KafkaModule } from 'src/infra/kafka/kafka.module';
import { ServiceModule } from 'src/services/service.module';
import { CustomerController } from './customer.controller';
import { PaymentController } from './payment.controller';

@Module({
  imports: [ServiceModule, KafkaModule],
  controllers: [PaymentController, CustomerController],
})
export class ControllerModule {}
