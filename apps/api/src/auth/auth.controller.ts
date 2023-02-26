import {
  Controller,
  Post,
  Body,
  UnauthorizedException,
  Get,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './decorators/get-user.decorator';
import { User } from 'src/users/entities/user.entity';
import { GetRawHeaders } from './decorators/raw-headers.decorator';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('register')
  async register(@Body() createAuthDto: CreateUserDto) {
    const user = await this.userService.create(createAuthDto);
    delete user.password;
    return { ...user, token: this.getJwtToken({ email: user.email }) };
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;

    try {
      const user = await this.userService.getUserInformation(email);

      if (!user) throw new UnauthorizedException("Email doesn't exist");
      console.log('USER', user);

      const isMatch = await bcrypt.compare(password, user.password);

      if (isMatch) {
        delete user.password;
        return { ...user, token: this.getJwtToken({ email: user.email }) };
      } else throw new UnauthorizedException('Wrong credentials');
    } catch (err) {
      return err;
    }
  }

  @Get('protected')
  @UseGuards(AuthGuard())
  helloProtected(
    @GetUser() user: User,
    @GetUser('email') field: string,
    @GetRawHeaders() headers: string[],
  ) {
    return {
      message: 'Hello Protected',
      user,
      email2: field,
      headers: headers,
    };
  }

  private getJwtToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }
}
