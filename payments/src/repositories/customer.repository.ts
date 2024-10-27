import { Injectable } from '@nestjs/common';
import { CustomerEntity } from 'src/infra/entities';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class CustomerRepository {
  private repository: Repository<CustomerEntity>;
  constructor(dataSource: DataSource) {
    this.repository = dataSource.getRepository(CustomerEntity);
  }

  public async getById(id: string) {
    const item = await this.repository.findOne({ where: { id } });
    return item;
  }

  public async create(data: CustomerEntity) {
    const item = await this.repository.save(data);
    return item
  }
}
