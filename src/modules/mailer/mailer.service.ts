import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MaileService {
    constructor(private mailerService: MailerService, private configService: ConfigService) { }

    async sendUserConfirmation(email: string, verifyAccounttoken: string): Promise<string> {
        try {
            await this.mailerService.sendMail({
                to: email,
                subject: 'Confirmación de cuenta',
                template: './accountConfirmation.hbs',
                context: {
                    url: this.configService.get('DOMAIN'),
                    token: verifyAccounttoken
                }
            });
            return "Email send successfully";
        } catch (e) {
            throw new HttpException(e.response, HttpStatus.CONFLICT);
        }
    }
}
