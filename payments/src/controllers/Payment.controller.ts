import { Controller, Get } from "@nestjs/common";
import { PaymentEntity } from "src/infra/entities";
import { PaymentService } from "src/services/payment.service";

@Controller("/api/payments")
export class PaymentController {
    constructor(protected paymentService: PaymentService){}

    @Get()
    public async getAll(): Promise<{total: number, data: PaymentEntity[]}>{
        const data = await this.paymentService.getAll()
        return data
    }
}