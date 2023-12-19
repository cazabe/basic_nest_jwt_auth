import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
export declare class MaileService {
    private mailerService;
    private configService;
    constructor(mailerService: MailerService, configService: ConfigService);
    sendUserConfirmation(email: string, verifyAccounttoken: string): Promise<string>;
}
