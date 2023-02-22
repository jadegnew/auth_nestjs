import { Controller, Post, Body, Req, HttpCode, UseGuards, Res, Get, UseInterceptors, ClassSerializerInterceptor, Param } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { RegistrationDto } from '../../dtos/registration.dto';
import RequestWithUser from '../../interfaces/requestWithUser.interface';
import { LocalAuthenticationGuard } from '../LocalStrategy/localAuthentication.guard';
import { UserService } from 'src/user/user.service';
import { RefreshAuthenticationGuard } from '../RefreshStrategy/refresh-authentication.guard';
import { JwtAuthenticationGuard } from '../JwtStrategy/jwt-authentication.guard';

@Controller('auth')
export class AuthenticationController {
    constructor(
        private readonly authenticationService: AuthenticationService,
        private readonly userService: UserService
    ) { }

    @Post('registration')
    @UseInterceptors(ClassSerializerInterceptor)
    async registration(@Body() regData: RegistrationDto) {
        return this.authenticationService.register(regData);
    }

    @HttpCode(200)
    @UseGuards(JwtAuthenticationGuard)
    @Post('logout')
    async logout(@Req() request: RequestWithUser) {
        await this.userService.removeRefresh(request.user.id);
        request.res?.setHeader('Set-Cookie', this.authenticationService.getLogoutCookies());
    }

    @UseInterceptors(ClassSerializerInterceptor)
    @UseGuards(RefreshAuthenticationGuard)
    @Get('refresh')
    async refresh(@Req() request: RequestWithUser) {
        const accessCookie = await this.authenticationService.getAccessToken(request.user.id);
        request.res?.setHeader('Set-Cookie', accessCookie);
        return request.user;
    }

    @UseInterceptors(ClassSerializerInterceptor)
    @UseGuards(JwtAuthenticationGuard)
    @Get('activate/:link')
    async activate(@Req() request: RequestWithUser) {
        if (await this.userService.activate(request.user.id, request.params.link)) {
            return 'Success';
        }
        return 'Wrong activation link';
    }

    @HttpCode(200)
    @UseGuards(LocalAuthenticationGuard)
    @UseInterceptors(ClassSerializerInterceptor)
    @Post('login')
    async login(@Req() request: RequestWithUser) {
        const { user } = request;
        const accessCookie = await this.authenticationService.getAccessToken(user.id);
        const refreshCookie = await this.authenticationService.getRefreshToken(user.id);
        await this.userService.saveRefresh(user.id, refreshCookie.token)
        request.res?.setHeader('Set-Cookie', [accessCookie, refreshCookie.cookie]);
        return user;
    }
}