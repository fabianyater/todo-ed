import * as bcrypt from 'bcrypt';
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common';

import { UserService } from './user.service';
import { Timestamp } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { Response, Request } from 'express';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  @Get('/all')
  async getAll() {
    return await this.userService.getAll();
  }

  @Post('/signup')
  async createUser(
    @Body('user_name') user_name: string,
    @Body('user_email') user_email: string,
    @Body('user_key_secret') user_key_secret: string,
    @Body('user_state') user_state: number,
    @Body('user_created_at') user_created_at: Timestamp,
    @Body('user_updated_at') user_updated_at: Timestamp,
  ) {
    const saltOrRounds = 10;
    const hashPassword = await bcrypt.hash(user_key_secret, saltOrRounds);
    return await this.userService.createUser({
      user_name,
      user_email,
      user_key_secret: hashPassword,
      user_state,
      user_created_at,
      user_updated_at,
    });
  }

  @Post('/login')
  async login(
    @Body('user_email') user_email: string,
    @Body('user_key_secret') user_key_secret: string,
    @Res({ passthrough: true }) response: Response,
  ) {
    const user = await this.userService.getUserByEmail({ user_email });
    if (!user) {
      throw new BadRequestException('Usuario erróneo');
    }
    if (!(await bcrypt.compare(user_key_secret, user.user_key_secret))) {
      throw new BadRequestException('Contraseña errónea');
    }

    const jwt = await this.jwtService.signAsync({ id: user.user_id });

    response.cookie('jwt', jwt, { httpOnly: true });

    return { message: 'Sesión iniciada' };
  }

  @Get('/user')
  async user(@Req() request: Request) {
    try {
      const cookie = request.cookies['jwt'];

      const data = await this.jwtService.verifyAsync(cookie);

      if (!data) {
        throw new UnauthorizedException();
      }

      const user = await this.userService.getUserByEmail({
        user_id: data['id'],
      });

      const { user_key_secret, ...result } = user;
      return result;
    } catch (e) {
      throw new UnauthorizedException();
    }
  }

  @Post('logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('jwt');
    return {
      message: 'Sesión cerrada',
    };
  }

  @Get('/id/:id')
  async getUserById(@Param('id') id: Number) {
    return await this.userService.getUserById(id);
  }

  @Put('/:id')
  async updateUser(@Param('id') id: Number, @Body() body) {
    console.log('Body update: ', body);

    return await this.userService.updateUser(id, body);
  }

  @Delete('/:id')
  async deleteUser(@Param('id') id: Number) {
    return this.userService.deleteUser(id);
  }
}
