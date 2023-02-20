import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UserService } from "src/user/user.service";
import { TokenPayload } from "src/interfaces/tokenPayload.interface";

@Injectable()
export class RefreshStrategy extends PassportStrategy(Strategy, 'refresh') {
    constructor(
        private readonly configService: ConfigService,
        private readonly userService: UserService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([(request: Request) => {
                return request?.cookies?.Refresh;
            }]),
            secretOrKey: configService.get('JWT_REFRESH_SECRET'),
            passReqToCallback: true
        })
    }

    async validate(request: Request, payload: TokenPayload) {
        const refreshToken: string = request?.cookies?.Refresh;
        return this.userService.refreshTokenMatch(refreshToken, payload.userId);
    }
}