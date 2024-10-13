import {
  BadRequestException,
  Body,
  Controller,
  Post,
  Res,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Response } from 'express';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private jwtService: JwtService,
  ) {}

  @Post('register')
  async register(
    @Body('username') username: string,
    @Body('password') password: string,
  ) {
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await this.authService.create({
      username,
      password: hashedPassword,
      colorIndex: Math.floor(Math.random() * 10),
      pdfs: [],
    });

    return user;
  }

  @Post('login')
  async login(
    @Body('username') username: string,
    @Body('password') password: string,
    @Res({ passthrough: true }) response: Response,
  ) {
    const user = await this.authService.findOne({ username });

    if (!user) {
      console.log('username error!');
      throw new BadRequestException('Invalid Credentials');
    }

    if (!(await bcrypt.compare(password, user.password))) {
      console.log(password, user.password);
      throw new BadRequestException('Password Error, check credentials!!');
    }

    const jwt = await this.jwtService.signAsync({ id: user.id });
    response.cookie('jwt', jwt, { httpOnly: true });
    return { message: 'success', user, jwt };
  }

  @Post('logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('jwt');
    return { message: 'Logout Success' };
  }
}
