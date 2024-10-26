import { Injectable } from "@nestjs/common";
import { PaymentEntity } from "src/infra/entities";
import { DataSource, Repository } from "typeorm";

@Injectable()
export class PaymentRepository {
    private repository: Repository<PaymentEntity>
    constructor(dataSource: DataSource){
        this.repository = dataSource.getRepository(PaymentEntity)
    }
    public async getAll(){
        const [data, total] = await this.repository.findAndCount()
        return {
            data,
            total
        };
    }
}