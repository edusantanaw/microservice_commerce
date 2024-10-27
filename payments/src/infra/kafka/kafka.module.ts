import { Module } from '@nestjs/common';
import { KafkaSevice } from './kafka';

@Module({
  providers: [KafkaSevice],
  exports: [KafkaSevice],
})
export class KafkaModule {}
