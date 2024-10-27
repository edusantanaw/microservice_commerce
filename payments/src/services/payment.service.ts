import { Injectable } from '@nestjs/common';
import { CreatePaymentDTO } from 'src/dtos/payment.dto';
import { PaymentEntity } from 'src/infra/entities';
import { CustomerRepository } from 'src/repositories/customer.repository';
import { PaymentRepository } from 'src/repositories/payment.repository';
import { DomainException } from 'src/utils/errors/domain.exception';
import { NotFoundException } from 'src/utils/errors/notFound.exception';

@Injectable()
export class PaymentService {
  constructor(
    protected paymentRepository: PaymentRepository,
    protected customerRepository: CustomerRepository,
  ) {}

  public async getAll() {
    const data = await this.paymentRepository.getAll();
    return data;
  }

  public async create(data: CreatePaymentDTO) {
    const customerExists = await this.customerRepository.getById(data.customer);
    if (!customerExists) throw new NotFoundException('Cliente não encontrado!');
    if (data.value <= 0) throw new DomainException('O valor não pode ser 0 ou negativo!');
    const payment = new PaymentEntity({
      ...data,
      customer: customerExists,
    });
    console.log(payment)
    const created = await this.paymentRepository.create(payment);
    return created;
  }
}
