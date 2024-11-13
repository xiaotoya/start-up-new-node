import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm/repository/Repository';
import { User } from './user.entity';

@Injectable()
export class UserService {
    constructor(
        @Inject('USER_REPOSITORY')
        private readonly userRepo: Repository<User>
    ) {}
    async findUserByName(name: string): Promise<User> {
        return this.userRepo.findOneBy({
            username: name
        });
    }
}
