import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from './user/user.service';
import { JwtService } from '@nestjs/jwt';
import { UserDTO } from './user/user.dto';

@Injectable()
export class AuthService {
    constructor(
        private userSvc: UserService,
        private jwtService: JwtService,
    ) {}
    async signIn(userDto: UserDTO) {
        const user = await this.userSvc.findUserByName(userDto.username);
        if (user?.password !== userDto.password) {
          throw new UnauthorizedException();
        }
        const payload = { sub: user.id.toString(), username: userDto.username };
        return {
          access_token: await this.jwtService.signAsync(payload),
        };
    }
}
