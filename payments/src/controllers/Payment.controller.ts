import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { CreatePaymentDTO } from 'src/dtos/payment.dto';
import { PaymentEntity } from 'src/infra/entities';
import { NotifyService } from 'src/services/notify.service';
import { PaymentService } from 'src/services/payment.service';

@Controller('/api/payments')
export class PaymentController {
  constructor(
    protected paymentService: PaymentService,
    protected notifyService: NotifyService,
  ) {}

  @Get()
  public async getAll(): Promise<{ total: number; data: PaymentEntity[] }> {
    const data = await this.paymentService.getAll();
    return data;
  }

  @Post()
  @HttpCode(201)
  public async create(@Body() data: CreatePaymentDTO) {
    const created = await this.paymentService.create(data);
    await this.notifyService.notify('payment', created);
    return created;
  }
}
