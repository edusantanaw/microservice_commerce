import { Injectable, Logger } from '@nestjs/common';
import { Producer } from 'kafkajs';
import { KafkaService } from 'src/infra/kafka/kafka';

@Injectable()
export class NotifyService {
  protected producer: Producer;
  protected logger: Logger;
  constructor(kafkaService: KafkaService) {
    this.logger = new Logger();
    kafkaService
      .getProducer({
        allowAutoTopicCreation: true,
        brokers: ['localhost:9092'],
      })
      .then((producer) => (this.producer = producer));
  }

  public async notify(topic: string, message: unknown) {
    try {
      await this.producer.send({
        topic: topic,
        messages: [
          {
            value: JSON.stringify(message),
          },
        ],
      });
    } catch (error) {
      const { message } = error as Error;
      this.logger.error(`falha ao notificar mensagem: ${message}`);
    }
  }
}
