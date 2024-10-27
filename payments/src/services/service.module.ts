import { Module } from '@nestjs/common';
import { KafkaModule } from 'src/infra/kafka/kafka.module';
import { RepositoryModule } from 'src/repositories/repository.module';
import { CustomerService } from './customer.service';
import { NotifyService } from './notify.service';
import { PaymentService } from './payment.service';

@Module({
  imports: [RepositoryModule, KafkaModule],
  providers: [PaymentService, CustomerService, NotifyService],
  exports: [PaymentService, CustomerService, NotifyService],
})
export class ServiceModule {}
