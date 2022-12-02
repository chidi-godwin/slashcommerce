import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { MailService } from 'src/mail/mail.service';
import { UserRepository } from 'src/user/user.dao';

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
    private configService: ConfigService,
    private mailService: MailService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user: any = await this.userRepository.findOneByEmail(email);

    if (user && (await UserRepository.comparePassword(pass, user.password))) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.username, sub: user.id };
    return {
      user: user,
      access_token: this.jwtService.sign(payload),
    };
  }

  async requestPasswordReset(email: string, host: string) {
    const user: any = await this.userRepository.findOneByEmail(email);
    if (user) {
      const payload = { email: user.email, sub: user.id };
      const access_token = this.jwtService.sign(payload, { expiresIn: '1h' });
      const link = `${host}/reset-password?token=${access_token}`;
      console.log(link);
      this.mailService.sendPasswordResetMail(user.email, user.firstname, link);
      return {
        message: 'Password reset link sent to your email',
        token: access_token,
      };
    }
    return {
      message: `User with email: ${email} not found`,
    };
  }

  async resetPassword(token: string, password: string) {
    try {
      const decoded = this.jwtService.verify(token);
      const user: any = await this.userRepository.findOneByEmail(decoded.email);
      if (user) {
        await this.userRepository.updatePassword(user.id, password);
        return {
          message: 'Password reset successful',
        };
      }
      return {
        message: `User with email: ${decoded.email} not found`,
      };
    } catch (error) {
      return {
        message: 'Invalid token',
      };
    }
  }
}
