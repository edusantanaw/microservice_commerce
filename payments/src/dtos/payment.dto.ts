import { IsNotEmpty, IsEnum } from "class-validator"
import { PaymentsTypes } from "src/infra/entities"

export class CreatePaymentDTO {
    @IsNotEmpty({message: "O campo customer é obrigatorio!"})
    customer: string
    @IsNotEmpty({message: "O campo value é obrigatorio!"})
    value: number
    @IsNotEmpty({message: "O campo paymentType é obrigatorio!"})
    @IsEnum(PaymentsTypes, {message: "tipo de pagamento invalido!"})
    paymentType: number
}