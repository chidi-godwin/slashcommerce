/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller, Request, Post, UseGuards, Body } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { LocalAuthGuard } from './local-auth.guard';
import loginUserExample from './dto/responses/examples/login-user.example';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiResponse({
    status: 200,
    description: 'Logout successful',
    content: {
      'application/json': {
        example: loginUserExample,
      },
    },
  })
  async login(@Request() req, @Body() body: LoginUserDto) {
    return this.authService.login(req.user);
  }
}
