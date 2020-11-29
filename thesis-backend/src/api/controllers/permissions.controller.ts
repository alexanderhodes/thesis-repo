import {Controller, Get, NotFoundException, Param, UseGuards} from '@nestjs/common';
import {ApiBearerAuth, ApiTags} from '@nestjs/swagger';
import {PermissionsService} from '../../database/services';
import {JwtAuthGuard, PermissionsGuard} from '../../authorization/guards';
import {HasPermissions} from '../../authorization/decorators';
import {PermissionsEnum} from '../../authorization/constants';
import {PermissionDto} from '../dtos';

@ApiTags('permissions')
@Controller("permissions")
export class PermissionsController {

    constructor(private permissionsService: PermissionsService) {}

    @UseGuards(JwtAuthGuard, PermissionsGuard)
    @HasPermissions(PermissionsEnum.USER_READ)
    @Get()
    @ApiBearerAuth()
    findAll(): Promise<PermissionDto[]> {
        return this.permissionsService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @Get(":name")
    @ApiBearerAuth()
    async findOneByName(@Param("name") name: string): Promise<PermissionDto> {
        const permission = await this.permissionsService.findOne(name);
        if (permission) {
            return permission;
        }
        throw new NotFoundException("Permission", `not found for name ${name}`);
    }

}
