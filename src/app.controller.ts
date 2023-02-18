import { Controller, Get, Post, Body } from '@nestjs/common';
import { AuthenticationService } from './authentication/authentication.service';
import { CreateUserDto } from './user/createUser.dto';
import { LoginUserDto } from './user/loginUser.dto';

@Controller('/api')
export class AppController {
    constructor(private authenticationService: AuthenticationService) {}

    @Get('/login')
    login(@Body() params: LoginUserDto) {
        return this.authenticationService.login(params.email, params.password);
    }

    @Post('/registration')
    registration(@Body() params: CreateUserDto) {
        return this.authenticationService.register(params);
    }
}
