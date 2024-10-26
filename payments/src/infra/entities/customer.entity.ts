import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { PaymentEntity } from "./payment.entity";

@Entity({name: "customer"})
export class CustomerEntity {
    @PrimaryColumn({ type: 'uuid' })
    id: string

    @Column({type: "text"})
    name: string
    
    @Column({type: "text", unique: true})
    email: string
    
    @Column({type: "text", unique: true})
    cpfCnpj: string
    
    @Column({type: "bool", default: false})
    deleted: boolean

    @ManyToOne(()=> PaymentEntity, (p)=> p.customer)
    payments: PaymentEntity
}