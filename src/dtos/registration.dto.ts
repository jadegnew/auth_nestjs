import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class RegistrationDto {

    @IsEmail()
    email: string;
    
    @IsString()
    @IsNotEmpty()
    username: string;
    
    @IsString()
    @MinLength(7)
    password: string;
}