import { Body, Controller, HttpCode, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";


@Controller('auth')
export class AuthController{

    constructor(private readonly authService: AuthService) {}

    @Post()
    @HttpCode(200)
    async login(@Body() createUserDto: {username: string; password: string}): Promise<string> {
        return await this.authService.login(createUserDto.username, createUserDto.password);
    }

}