import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { RegistrationDto } from './registration.dto';
import { PostgresErrorCode } from 'src/database/postgresErrorCodes.enum';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthenticationService {
    constructor(private readonly userService: UserService) { }

    public async register(registrationData: RegistrationDto) {
        const hashPassword = await bcrypt.hash(registrationData.password, 10);
        try {
            const createdUser = await this.userService.registration({
                ...registrationData,
                password: hashPassword
            });
            createdUser.password = '';
            return createdUser;
        } catch (error) {
            if (error?.code === PostgresErrorCode.UniqueViolation) {
                throw new HttpException('User with that email already exists', HttpStatus.BAD_REQUEST);
            } else {
                throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }

    public async login(email: string, password: string) {
        try {
            const user = await this.userService.getByEmail(email);
            await this.verifyPassword(password, user.password);
            user.password = '';
            return user;
        } catch (error) {
            throw new HttpException('Wrong email or password', HttpStatus.BAD_REQUEST);
        }
    } 

    private async verifyPassword(plainPassword: string, hashPassword: string) {
        const isMatch = await bcrypt.compare(plainPassword, hashPassword);
        if(!isMatch) throw new HttpException('Wrong email or password', HttpStatus.BAD_REQUEST);
    }
}
