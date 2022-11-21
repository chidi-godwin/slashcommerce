/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller, Request, Post, UseGuards, Body } from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import {
  loginUserExampleBody,
  loginUserExampleResponse,
} from './dto/responses/examples/login-user.example';
import { LocalAuthGuard } from './local-auth.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiBody({
    type: LoginUserDto,
    description: 'Login User',
    examples: {
      'Login User': {
        value: loginUserExampleBody,
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Logout successful',
    content: {
      'application/json': {
        example: loginUserExampleResponse,
      },
    },
  })
  async login(@Request() req, @Body() body: LoginUserDto) {
    return this.authService.login(req.user);
  }
}
