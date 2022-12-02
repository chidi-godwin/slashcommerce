import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(
    private readonly configService: ConfigService,
    private readonly mailerService: MailerService,
  ) {}

  private async sendMail(
    to: string,
    subject: string,
    template: string,
    params: any,
  ) {
    try {
      await this.mailerService.sendMail({
        to,
        subject,
        template,
        context: params,
      });
    } catch (error) {
      console.error(error);
    }
  }

  async sendWelcomeMail(to: string, name: string) {
    const template = 'test';
    return await this.sendMail(to, 'Welcome to FypTracker', template, {
      name,
    });
  }

  async sendPasswordResetMail(to: string, name: string, link: string) {
    const template = 'password-reset';
    return await this.sendMail(to, 'Password Reset', template, {
      name,
      link,
    });
  }
}
