import { Module } from '@nestjs/common';
import { KafkaConsumer } from './kafka';

@Module({
  providers: [KafkaConsumer],
  exports: [KafkaConsumer],
})
export class KafkaModule {}
