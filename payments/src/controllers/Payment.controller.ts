import { Controller, Get } from "@nestjs/common";

@Controller("/api/payments")
export class PaymentController {
    @Get()
    public async getAll(): Promise<string>{
        return "Hello, World"
    }
}