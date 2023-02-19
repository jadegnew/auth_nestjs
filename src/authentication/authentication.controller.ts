import { Controller, Post, Body, Req, HttpCode, UseGuards, Res } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { RegistrationDto } from './registration.dto';
import RequestWithUser from './requestWithUser.interface';
import { LocalAuthenticationGuard } from './localAuthentication.guard';
import { User } from 'src/user/user.entity';
import { Response } from 'express';

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
    async login(@Req() request: RequestWithUser, @Res() response: Response) { 
        const { user } = request;
        const cookie = this.authenticationService.getTokenCookie(user.id);
        response.setHeader('Set-Cookie', cookie);
        user.password = '';
        return response.send(user);
    }
}
