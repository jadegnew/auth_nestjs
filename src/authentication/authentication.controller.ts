import { Controller, Get, Post, Body, Req, HttpCode, UseGuards } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { RegistrationDto } from './registration.dto';
import RequestWithUser from './requestWithUser.interface';
import { LocalAuthenticationGuard } from './localAuthentication.guard';
import { User } from 'src/user/user.entity';

@Controller('auth')
export class AuthenticationController {
    constructor(private readonly authenticationService: AuthenticationService) { }

    @Post('registration')
    async registration(@Body() regData: RegistrationDto) {
        return this.authenticationService.register(regData);
    }

    @HttpCode(200)
    @UseGuards(LocalAuthenticationGuard)
    @Post('login')
    async logIn(@Req() request: RequestWithUser) {
        const user: User = request.user;
        user.password = '';
        return user;
    }
}
