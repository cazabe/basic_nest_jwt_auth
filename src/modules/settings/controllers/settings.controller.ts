import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { RolesGuard } from '../../../guards';
import {
  ApiDefaultResponse,
  ApiInternalServerResponse,
  ApiUnauthorizedErrorResponse,
} from '../../../common/api-response-swagger';
import { ROLES, messages } from '../../../constants';
import { AdminAccess, Roles } from '../../../decorators';
import { DefaultResponse } from '../../../common/schemas';
import { SettingsService } from '../services';
import { SettingsEntity } from '../entities';
import { SettingsDto, SettingsUpdateDto } from '../dtos';

@ApiTags('Settings')
@Controller('settings')
@UseGuards(RolesGuard)
@ApiBearerAuth()
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Post()
  @ApiDefaultResponse(messages['blogs.success.create'])
  @ApiInternalServerResponse(messages['blogs.error.create'])
  @ApiUnauthorizedErrorResponse()
  @ApiOperation({ summary: 'Access for admin only' })
  @AdminAccess()
  public async create(@Body() body: SettingsDto): Promise<DefaultResponse> {
    return await this.settingsService.createSettings(body);
  }

  @Get()
  @ApiInternalServerResponse(messages['blogs.error.get'])
  @ApiOperation({ summary: 'Allowed roles [Admin - Basic].' })
  @Roles(ROLES.BASIC)
  async getSettings(): Promise<SettingsEntity[]> {
    return this.settingsService.getSettings();
  }

  @Patch('/:id')
  @ApiDefaultResponse(messages['blogs.success.update'])
  @ApiInternalServerResponse(messages['blogs.error.update'])
  @ApiUnauthorizedErrorResponse()
  @ApiOperation({ summary: 'Access for admin only' })
  @AdminAccess()
  public async updatePost(
    @Body() body: SettingsUpdateDto,
    @Param('id', new ParseUUIDPipe()) id: string,
  ) {
    return await this.settingsService.updateSettings(body, id);
  }
}
