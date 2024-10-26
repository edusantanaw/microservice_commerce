import { Module } from "@nestjs/common";
import { PaymentRepository } from "./payment.repository";

@Module({
    providers: [PaymentRepository],
    exports: [PaymentRepository]
})
export class RepositoryModule{}