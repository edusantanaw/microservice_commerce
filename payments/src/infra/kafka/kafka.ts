import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Kafka } from 'kafkajs';

type ConsumerConfig = {
  brokers: string[];
  groupId: string;
  subscribe: {
    topic: string;
    fromBeginning: boolean;
  };
};

type ProducerConfig = {
  brokers: string[];
  allowAutoTopicCreation: boolean;
};

@Injectable()
export class KafkaService {
  constructor(protected eventEmitter: EventEmitter2) {}

  public async getProducer(data: ProducerConfig) {
    const kafka = new Kafka({
      brokers: data.brokers,
    });
    const producer = kafka.producer({
      allowAutoTopicCreation: data.allowAutoTopicCreation,
    });
    await producer.connect();
    return producer;
  }

  public async connectConsumer(data: ConsumerConfig) {
    const kafka = new Kafka({
      brokers: data.brokers,
    });
    const consumer = kafka.consumer({ groupId: data.groupId });
    await consumer.connect();
    await consumer.subscribe({ ...data.subscribe });
    await consumer.run({
      eachMessage: async (payload) => {
        const message = JSON.parse(
          Buffer.from(payload.message.value.toJSON().data).toString(),
        );
        this.eventEmitter.emit(payload.topic, message);
      },
    });
  }
}
