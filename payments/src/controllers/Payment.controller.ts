import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { CreatePaymentDTO } from 'src/dtos/payment.dto';
import { PaymentEntity } from 'src/infra/entities';
import { PaymentService } from 'src/services/payment.service';

@Controller('/api/payments')
export class PaymentController {
  constructor(protected paymentService: PaymentService) {}

  @Get()
  public async getAll(): Promise<{ total: number; data: PaymentEntity[] }> {
    const data = await this.paymentService.getAll();
    return data;
  }

  @Post()
  @HttpCode(201)
  public async create(@Body() data: CreatePaymentDTO) {
    console.log(data)
    const created = await this.paymentService.create(data);
    return created;
  }
}
