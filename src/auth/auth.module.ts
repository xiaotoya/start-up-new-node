import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserService } from './user/user.service';
import { JwtModule } from '@nestjs/jwt';
import { userProviders } from './user/user.provider';
import { DatabaseModule } from '@/database/database.module';
import { jwtConstants } from './jwt.constant';

@Module({
  imports: [
    DatabaseModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1 days' },
    }),
  ],
  controllers: [
    AuthController,
  ],
  providers: [AuthService, UserService, userProviders],
})
export class AuthModule {}
