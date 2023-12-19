import { Controller, Body, Post, HttpException, HttpStatus } from '@nestjs/common';
import { CreateUserDto } from './dto/user.dto';
import { UserService } from './user.service';
import { Public } from 'src/common/decorators/auth.decorator';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) { }
    @Post()
    @Public()
    create(@Body() userDto: CreateUserDto): Promise<{}> {
        return this.userService.create(userDto);
    }
}
