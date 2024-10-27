import { Module } from '@nestjs/common';
import { RepositoryModule } from 'src/repositories/repository.module';
import { PaymentService } from './payment.service';
import { CustomerService } from './customer.service';

@Module({
  imports: [RepositoryModule],
  providers: [PaymentService, CustomerService],
  exports: [PaymentService, CustomerService],
})
export class ServiceModule {}
