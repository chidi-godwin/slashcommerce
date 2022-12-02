/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller, Request, Post, UseGuards, Body } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { PasswordResetDto } from './dto/password-reset.dto';
import { RequestPasswordResetDto } from './dto/request-password-reset.dto';
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
  @ApiOperation({ summary: 'Login user' })
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
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
    content: {
      'application/json': {
        example: {
          statusCode: 401,
          message: 'Unauthorized',
          error: 'Unauthorized',
        },
      },
    },
  })
  async login(@Request() req, @Body() body: LoginUserDto) {
    return this.authService.login(req.user);
  }

  @Post('request-password-reset')
  @ApiOperation({ summary: 'Request password reset' })
  @ApiBody({
    type: RequestPasswordResetDto,
  })
  @ApiResponse({
    status: 201,
    description: 'Password reset link sent to your email',
    content: {
      'application/json': {
        example: {
          message: 'Password reset link sent to your email',
        },
      },
    },
  })
  async requestPasswordReset(
    @Body() body: RequestPasswordResetDto,
    @Request() req,
  ) {
    return this.authService.requestPasswordReset(
      body.email,
      req.headers.origin,
    );
  }

  @Post('reset-password')
  @ApiOperation({
    summary: 'Reset password',
    description: 'Reset password',
  })
  @ApiBody({
    type: PasswordResetDto,
    description: 'Reset Password',
  })
  @ApiResponse({
    status: 201,
    description: 'Password reset successful',
    content: {
      'application/json': {
        example: { message: 'Password reset successful' },
      },
    },
  })
  async passwordReset(@Body() body: PasswordResetDto) {
    return this.authService.resetPassword(body.token, body.password);
  }
}
