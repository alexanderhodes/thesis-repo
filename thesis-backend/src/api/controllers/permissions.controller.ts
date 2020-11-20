import {Controller, Get, NotFoundException, Param, UseGuards} from '@nestjs/common';
import {PermissionsService} from '../../database/services';
import {JwtAuthGuard, PermissionsGuard} from '../../authorization/guards';
import {HasPermissions} from '../../authorization/decorators';
import {PermissionsEnum} from '../../authorization/constants';
import {PermissionDTO} from '../dtos';

@Controller("permissions")
export class PermissionsController {

    constructor(private permissionsService: PermissionsService) {}

    @UseGuards(JwtAuthGuard, PermissionsGuard)
    @HasPermissions(PermissionsEnum.USER_READ)
    @Get()
    findAll(): Promise<PermissionDTO[]> {
        return this.permissionsService.findAll();
    }

    @Get(":name")
    async findOneByName(@Param("name") name: string): Promise<PermissionDTO> {
        const permission = await this.permissionsService.findOne(name);
        if (permission) {
            return permission;
        }
        throw new NotFoundException("Permission", `not found for name ${name}`);
    }

}
