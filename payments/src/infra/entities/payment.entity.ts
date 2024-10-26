import { Column, Entity, OneToMany, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { CustomerEntity } from "./customer.entity";

export enum PaymentsTypes {
    "BILLET",
    "CREDIT_CARD",
    "PIX"
}

@Entity({name: "payment"})
export class PaymentEntity {
    @PrimaryColumn({type: "uuid"})
    id: string
  
    @Column({nullable: false, type: "float"})
    value: number

    @OneToMany(()=> CustomerEntity, (c)=> c.payments)
    customer: CustomerEntity

    @Column({type: "int"})
    paymentType: PaymentsTypes

    @Column({type: "date", nullable: true})
    payDate?: Date
    
    @Column({type: "bool", default: false})
    deleted: boolean

    @Column({type: "timestamp", })
    createdAt: Date
    
    @UpdateDateColumn()
    updatedAt: Date;
}