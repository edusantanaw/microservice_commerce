import { Module } from "@nestjs/common";
import { PaymentRepository } from "./payment.repository";
import { CustomerRepository } from "./customer.repository";

@Module({
    providers: [PaymentRepository, CustomerRepository],
    exports: [PaymentRepository, CustomerRepository]
})
export class RepositoryModule{}