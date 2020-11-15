import {Controller, Get, NotFoundException, Param, UseGuards} from '@nestjs/common';
import {RolesService} from '../../database/services';
import {RoleDto} from '../dtos';
import {JwtAuthGuard, PermissionsGuard} from '../../authorization/guards';
import {HasPermissions} from '../../authorization/decorators';
import {PermissionsEnum} from '../../authorization/constants';

@Controller("api/roles")
export class RolesController {

    constructor(private rolesService: RolesService) {}

    @UseGuards(JwtAuthGuard, PermissionsGuard)
    @HasPermissions(PermissionsEnum.USER_READ)
    @Get()
    findAll(): Promise<RoleDto[]> {
        return this.rolesService.findAll();
    }

    @UseGuards(JwtAuthGuard, PermissionsGuard)
    @HasPermissions(PermissionsEnum.USER_READ)
    @Get(":name")
    async findOneByName(@Param("name") name: string): Promise<RoleDto> {
        const role = await this.rolesService.findOneByName(name);
        if (role) {
            return role;
        }
        throw new NotFoundException("Role", `not found for name ${name}`);
    }

}
