import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfig } from './configs/typeorm';
import { ControllerModule } from './controllers/controller.module';

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    ControllerModule,
    TypeOrmModule.forRoot(DatabaseConfig),
  ],
})
export class AppModule {}
