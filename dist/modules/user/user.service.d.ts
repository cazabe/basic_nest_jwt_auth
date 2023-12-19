import { CreateUserDto, ReadUserDto } from './dto/user.dto';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';
import { MaileService } from '../mailer/mailer.service';
export declare class UserService {
    private userRepository;
    private mailServer;
    constructor(userRepository: Repository<User>, mailServer: MaileService);
    create(user: CreateUserDto): Promise<{
        message: string;
        email: string;
    }>;
    findOne(userName: string): Promise<ReadUserDto>;
    validateCode(verifyCode: string): Promise<boolean>;
    validateUserAccount(verifyCode: string): Promise<{
        message: string;
    }>;
}
