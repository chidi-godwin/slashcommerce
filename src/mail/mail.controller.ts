import { Controller, Get } from '@nestjs/common';
import { MailService } from './mail.service';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Get()
  async sendMail() {
    return await this.mailService.sendWelcomeMail(
      'chidieberen1998@gmail.com',
      'chidi',
    );
  }
}
