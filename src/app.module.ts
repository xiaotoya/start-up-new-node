import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { CustomerModule } from './customer/customer.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { ResponseHandelerInterceptor } from '@/interceptors/response-handeler.interceptor';
import { AuthGuard } from './auth/auth.guard';
import { OrderModule } from './order/order.module';

@Module({
  imports: [DatabaseModule, CustomerModule, AuthModule, OrderModule],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseHandelerInterceptor,
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    }
  ],
})
export class AppModule {}
