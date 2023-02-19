import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { RegistrationDto } from '../../dtos/registration.dto';
import { PostgresErrorCode } from 'src/database/postgresErrorCodes.enum';
import { JwtService } from '@nestjs/jwt/dist';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { User } from 'src/user/user.entity';
import { TokenPayload } from '../../interfaces/tokenPayload.interface';

@Injectable()
export class AuthenticationService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
) { }

    public async register(registrationData: RegistrationDto): Promise<User> {
        const hashPassword = await bcrypt.hash(registrationData.password, 10);
        try {
            const createdUser = await this.userService.registration({
                ...registrationData,
                password: hashPassword
            });
            return createdUser;
        } catch (error) {
            if (error?.code === PostgresErrorCode.UniqueViolation) {
                throw new HttpException('User with that email already exists', HttpStatus.BAD_REQUEST);
            } else {
                throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }

    public async login(email: string, password: string): Promise<User> {
        try {
            const user = await this.userService.getByEmail(email);
            await this.verifyPassword(password, user.password);
            return user;
        } catch (error) {
            throw new HttpException('Wrong email or password', HttpStatus.BAD_REQUEST);
        }
    } 

    public logout() {
        return `Authentication=; HttpOnly; Path=/; Max-Age=0}`;
    }

    public getTokenCookie(userId: number): string {
        const payload: TokenPayload = { userId };
        const token = this.jwtService.sign(payload);
        return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get('JWT_EXPIRATION_TIME')}`;
    }

    private async verifyPassword(plainPassword: string, hashPassword: string): Promise<void> {
        const isMatch = await bcrypt.compare(plainPassword, hashPassword);
        if(!isMatch) throw new HttpException('Wrong email or password', HttpStatus.BAD_REQUEST);
    }


}
