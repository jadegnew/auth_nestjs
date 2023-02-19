import { Controller, Post, Body, Req, HttpCode, UseGuards, Res, Get, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { RegistrationDto } from '../../dtos/registration.dto';
import RequestWithUser from '../../interfaces/requestWithUser.interface';
import { LocalAuthenticationGuard } from '../LocalStrategy/localAuthentication.guard';
import { Response } from 'express';

@Controller('auth')
export class AuthenticationController {
    constructor(
        private readonly authenticationService: AuthenticationService
    ) { }

    @Post('registration')
    @UseInterceptors(ClassSerializerInterceptor)
    async registration(@Body() regData: RegistrationDto) {
        return this.authenticationService.register(regData);
    }

    @Get('logout')
    async logout(@Res() response: Response) {
        response.setHeader('Set-Cookie', this.authenticationService.logout());
        return response.sendStatus(200);
    }

    @HttpCode(200)
    @UseGuards(LocalAuthenticationGuard)
    @UseInterceptors(ClassSerializerInterceptor)
    @Post('login')
    async login(@Req() request: RequestWithUser) {
        const { user } = request;
        const cookie = await this.authenticationService.getTokenCookie(user.id);
        request.res?.setHeader('Set-Cookie', cookie);
        return user;
    }
}
