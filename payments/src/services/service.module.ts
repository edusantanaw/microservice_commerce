import { Module } from "@nestjs/common";
import { RepositoryModule } from "src/repositories/repository.module";
import { PaymentService } from "./payment.service";

@Module({
    imports: [RepositoryModule],
    providers: [PaymentService],
    exports: [PaymentService]
})
export class ServiceModule{}