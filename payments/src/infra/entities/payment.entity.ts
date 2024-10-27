import { randomUUID } from 'crypto';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CustomerEntity } from './customer.entity';

export enum PaymentsTypes {
  'BILLET',
  'CREDIT_CARD',
  'PIX',
}

type data = {
  id?: string;
  value: number;
  customer: CustomerEntity;
  paymentType: PaymentsTypes;
  deleted?: boolean;
};

@Entity({ name: 'payment' })
export class PaymentEntity {
  @PrimaryColumn({ type: 'text' })
  id: string;

  @Column({ nullable: false, type: 'float' })
  value: number;

  @ManyToOne(() => CustomerEntity, (c) => c.payments)
  customer: CustomerEntity;

  @Column({ type: 'int' })
  paymentType: PaymentsTypes;

  @Column({ type: 'date', nullable: true })
  payDate?: Date;

  @Column({ type: 'bool', default: false })
  deleted: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  constructor(data?: data) {
    if (!data) return;
    this.id = data?.id ?? randomUUID();
    this.customer = data.customer;
    this.value = data.value;
    this.paymentType = data.paymentType;
    this.deleted = !!data.deleted;
  }
}
