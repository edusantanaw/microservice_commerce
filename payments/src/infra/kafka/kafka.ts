import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Kafka } from 'kafkajs';

type config = {
  brokers: string[];
  groupId: string;
  subscribe: {
    topic: string;
    fromBeginning: boolean;
  };
};

@Injectable()
export class KafkaSevice {
  constructor(protected eventEmitter: EventEmitter2) {}

  public async connect(data: config) {
    const kafka = new Kafka({
      brokers: data.brokers,
    });
    const consumer = kafka.consumer({ groupId: data.groupId });
    await consumer.connect();
    await consumer.subscribe({ ...data.subscribe,  });
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
