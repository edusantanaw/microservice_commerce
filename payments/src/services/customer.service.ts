import { Injectable } from '@nestjs/common';
import { CustomerDTO } from 'src/dtos/customer.dto';
import { CustomerEntity } from 'src/infra/entities';
import { CustomerRepository } from 'src/repositories/customer.repository';

@Injectable()
export class CustomerService {
  constructor(protected repository: CustomerRepository) {}

  public async create(data: CustomerDTO) {
    const customer = new CustomerEntity(data);
    const created = await this.repository.create(customer);
    return created;
  }
}
