import { Module } from '@nestjs/common';
import { DatabaseConfig } from './configs/typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ControllerModule } from './controllers/controller.module';

@Module({
  imports: [
    ControllerModule, 
    TypeOrmModule.forRoot(DatabaseConfig)
  ],
})
export class AppModule {}
