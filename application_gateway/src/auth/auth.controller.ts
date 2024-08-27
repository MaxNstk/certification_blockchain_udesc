import { Body, Controller, HttpCode, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { User } from "src/users/user.schema";


@Controller('auth')
export class AuthController{

    constructor(private readonly authService: AuthService) {}

    @Post()
    @HttpCode(200)
    async signIn(@Body() createUserDto: {username: string; password: string}): Promise<{ access_token: string, user:User}> {
        return await this.authService.signIn(createUserDto.username, createUserDto.password);
    }

}