import { Module } from '@nestjs/common';
import { KafkaService } from './kafka';

@Module({
  providers: [KafkaService],
  exports: [KafkaService],
})
export class KafkaModule {}
