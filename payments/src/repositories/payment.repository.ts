import { Injectable } from '@nestjs/common';
import { PaymentEntity } from 'src/infra/entities';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class PaymentRepository {
  private repository: Repository<PaymentEntity>;
  constructor(dataSource: DataSource) {
    this.repository = dataSource.getRepository(PaymentEntity);
  }
  public async getAll(): Promise<{ data: PaymentEntity[]; total: number }> {
    const [data, total] = await this.repository.findAndCount({
      order: {
        createdAt: 'ASC',
      },
      loadRelationIds: true
    });
    return {
      total,
      data,
    };
  }

  public async create(data: PaymentEntity): Promise<PaymentEntity> {
    const payment = await this.repository.save({ ...data });
    return payment;
  }
}
