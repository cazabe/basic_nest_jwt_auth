import { PageDto, PageOptionsDto } from '../../../common/pagination';
import { UsersService } from '../services/users.service';
import { UpdatePassDto, UserDto, UserFilterDto, UserUpdateDto, UsersResponseDto } from '../dtos';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    registerUser(body: UserDto): Promise<import("../../../common/schemas").DefaultResponse<any>>;
    getUser(pageOptionsDto: PageOptionsDto, userFilter: UserFilterDto): Promise<PageDto<UsersResponseDto>>;
    userMe(userId: string): Promise<UsersResponseDto>;
    updateUser(id: string, body: UserUpdateDto): Promise<import("../../../common/schemas").DefaultResponse<any>>;
    updatePassMe(userId: string, passUserDto: UpdatePassDto): Promise<import("../../../common/schemas").DefaultResponse<any>>;
    updatePass(id: string, passUserDto: UpdatePassDto): Promise<import("../../../common/schemas").DefaultResponse<any>>;
    deleteUser(id: string): Promise<import("../../../common/schemas").DefaultResponse<any>>;
}
