import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/all')
  async getAll() {
    return await this.userService.getAll();
  }

  @Post()
  async createUser(@Body() body) {
    return await this.userService.createUser(body);
  }
}
