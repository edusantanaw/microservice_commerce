import { Module } from "@nestjs/common";
import { PaymentController } from "./payment.controller";
import { ServiceModule } from "src/services/service.module";
import { CustomerController } from "./customer.controller";

@Module({
    controllers: [PaymentController, CustomerController],
    imports: [ServiceModule]
})
export class ControllerModule {}