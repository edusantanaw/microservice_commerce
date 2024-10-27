import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { PaymentEntity } from './payment.entity';
import { CustomerDTO } from 'src/dtos/customer.dto';

@Entity({ name: 'customer' })
export class CustomerEntity {
  @PrimaryColumn({ type: 'text' })
  id: string;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'text' })
  email: string;

  @Column({ type: 'text' })
  cpfCnpj: string;

  @Column({ type: 'bool', default: false })
  deleted: boolean;

  @ManyToOne(() => PaymentEntity, (p) => p.customer)
  payments: PaymentEntity;

  constructor(data: CustomerDTO) {
    this.id = data.id;
    this.cpfCnpj = data.cpfCnpj;
    this.name = data.name;
    this.email = data.email;
    this.deleted = data.deleted;
  }
}
