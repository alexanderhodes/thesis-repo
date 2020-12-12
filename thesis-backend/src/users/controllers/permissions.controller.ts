import {Controller, Get, NotFoundException, Param, UseGuards} from '@nestjs/common';
import {ApiBearerAuth, ApiOkResponse, ApiTags} from '@nestjs/swagger';
import {PermissionsService} from '../../database';
import {HasPermissions, JwtAuthGuard, PermissionsEnum, PermissionsGuard} from '../../authorization';
import {PermissionDto} from '../dtos';

@ApiTags('permissions')
@Controller("permissions")
export class PermissionsController {

    constructor(private permissionsService: PermissionsService) {}

    @UseGuards(JwtAuthGuard, PermissionsGuard)
    @HasPermissions(PermissionsEnum.USER_READ)
    @Get()
    @ApiOkResponse({
        type: PermissionDto
    })
    @ApiBearerAuth()
    findAll(): Promise<PermissionDto[]> {
        return this.permissionsService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @Get(":name")
    @ApiOkResponse({
        type: PermissionDto
    })
    @ApiBearerAuth()
    async findOneByName(@Param("name") name: string): Promise<PermissionDto> {
        const permission = await this.permissionsService.findOne(name);
        if (permission) {
            return permission;
        }
        throw new NotFoundException("Permission", `not found for name ${name}`);
    }

}
