import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';
import UsersService from 'src/users/users.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private jwtService: JwtService,
    private userService: UsersService
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
      const token = this.extractTokenFromHeader(req);
      if (!token) {
        throw new UnauthorizedException();
      }
      try {
        const payload = await this.jwtService.verifyAsync(
          token, {secret: process.env.JWT_SECRET}
        );
        const user = await this.userService.findUserByUsername(payload.username)
        req['user'] = user;
      } catch (e) {
        throw new UnauthorizedException();
      }
      next();
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
