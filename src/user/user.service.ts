import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dtos/createUser.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) {}

    async getById(id: number): Promise<User> {
        const user = await this.userRepository.findOneBy({id});
        if (user) return user;
        throw new HttpException(`User with id ${id} not found`, HttpStatus.NOT_FOUND);
    }

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
