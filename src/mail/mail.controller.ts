import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { MailService } from './mail.service';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @ApiOperation({ summary: 'Send Test email' })
  @Get(':email/:name')
  async sendMail(@Param('email') email: string, @Param('name') name: string) {
    await this.mailService.sendWelcomeMail(email, name);
    return 'email sent';
  }
}
