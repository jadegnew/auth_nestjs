import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './createUser.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) {}

    async getByEmail(email: string): Promise<User> {
        const user = await this.userRepository.findOneBy({email});
        if (user) return user;
        throw new HttpException(`User with email ${email} not found`, HttpStatus.NOT_FOUND);
    }

    async registration(userData: CreateUserDto) {
        const user = await this.userRepository.create(userData);
        await this.userRepository.save(user);
        return user;
    }
}
