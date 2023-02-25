import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import * as bcrypt from 'bcrypt';

@Controller('auth')
export class AuthController {
  constructor(private readonly userService: UsersService) {}

  @Post('register')
  async register(@Body() createAuthDto: CreateUserDto) {
    const user = await this.userService.create(createAuthDto);
    return user;
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;

    try {
      const user = await this.userService.findByEmail(email);

      if (!user) throw new UnauthorizedException("Email doesn't exist");
      console.log('USER', user);
      const isMatch = await bcrypt.compare(password, user.password);

      return isMatch;
    } catch (err) {
      return err;
    }
  }
}
