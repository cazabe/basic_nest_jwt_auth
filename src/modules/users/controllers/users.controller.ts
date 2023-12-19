import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { PageDto, PageOptionsDto } from '../../../common/pagination';
import {
  ApiDefaultResponse,
  ApiInternalServerResponse,
  ApiPaginatedResponse,
  ApiUnauthorizedErrorResponse,
} from '../../../common/api-response-swagger';
import { AdminAccess, GetUserId } from '../../../decorators';
import { RolesGuard } from '../../../guards';
import { messages } from '../../../constants';
import { UsersService } from '../services/users.service';
import {
  UpdatePassDto,
  UserDto,
  UserFilterDto,
  UserUpdateDto,
  UsersResponseDto,
} from '../dtos';

@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
@UseGuards(RolesGuard)
@ApiUnauthorizedErrorResponse()
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  @ApiDefaultResponse(messages['users.success.create'])
  @ApiInternalServerResponse(messages['users.error.create'])
  @ApiOperation({ summary: 'Access for admin only' })
  @AdminAccess()
  public registerUser(@Body() body: UserDto) {
    return this.usersService.createUser(body);
  }

  @Get()
  @ApiPaginatedResponse(UsersResponseDto)
  @ApiInternalServerResponse(messages['users.error.get'])
  @ApiOperation({ summary: 'Access for admin only' })
  @AdminAccess()
  async getUser(
    @Query() pageOptionsDto: PageOptionsDto,
    @Query() userFilter: UserFilterDto,
  ): Promise<PageDto<UsersResponseDto>> {
    return this.usersService.getUsers(pageOptionsDto, userFilter);
  }

  @Get('/me')
  @ApiInternalServerResponse(messages['users.error.get'])
  @ApiOperation({ summary: 'Access for admin only' })
  @AdminAccess()
  public userMe(@GetUserId() userId: string): Promise<UsersResponseDto> {
    return this.usersService.findUserById(userId);
  }

  @Patch('/:id')
  @ApiDefaultResponse(messages['users.success.update'])
  @ApiInternalServerResponse(messages['users.error.update'])
  @ApiOperation({ summary: 'Access for admin only' })
  @AdminAccess()
  public updateUser(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body: UserUpdateDto,
  ) {
    return this.usersService.updateUser(id, body);
  }

  @Patch('/pass')
  @ApiDefaultResponse(messages['users.success.update.password'])
  @ApiInternalServerResponse(messages['users.error.update.password'])
  @ApiOperation({ summary: 'Access for admin only' })
  @AdminAccess()
  updatePassMe(
    @GetUserId() userId: string,
    @Body(ValidationPipe) passUserDto: UpdatePassDto,
  ) {
    return this.usersService.updatePasswordMe(userId, passUserDto);
  }

  @Patch('/pass/:id')
  @ApiDefaultResponse(messages['users.success.update.password'])
  @ApiInternalServerResponse(messages['users.error.update.password'])
  @ApiOperation({ summary: 'Access for admin only' })
  @AdminAccess()
  updatePass(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body(ValidationPipe) passUserDto: UpdatePassDto,
  ) {
    return this.usersService.updatePassword(id, passUserDto);
  }

  @Delete('/:id')
  @ApiDefaultResponse(messages['users.success.delete'])
  @ApiInternalServerResponse(messages['users.error.delete'])
  @ApiOperation({ summary: 'Access for admin only' })
  @AdminAccess()
  async deleteUser(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.usersService.deleteUser(id);
  }
}
