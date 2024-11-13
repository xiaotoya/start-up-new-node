import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { DatabaseModule } from '@/database/database.module';
import { orderProviders } from './order.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [OrderController],
  providers: [OrderService, orderProviders,],
})
export class OrderModule {}
