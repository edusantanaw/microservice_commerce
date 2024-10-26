import { Module } from "@nestjs/common";
import { PaymentController } from "./Payment.controller";
import { ServiceModule } from "src/services/service.module";

@Module({
    controllers: [PaymentController],
    imports: [ServiceModule]
})
export class ControllerModule {}