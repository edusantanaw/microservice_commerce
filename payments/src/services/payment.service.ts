import { Injectable } from "@nestjs/common";
import { PaymentRepository } from "src/repositories/payment.repository";

@Injectable()
export class PaymentService {
    constructor(protected paymentRepository: PaymentRepository){}

    public async getAll(){
        const data = await this.paymentRepository.getAll()
        return data
    }
}