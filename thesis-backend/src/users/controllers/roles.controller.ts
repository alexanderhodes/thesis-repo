import {Controller, Get, NotFoundException, Param, UseGuards} from '@nestjs/common';
import {ApiBearerAuth, ApiOkResponse, ApiTags} from '@nestjs/swagger';
import {RolesService} from '../../database';
import {RoleDto} from '../dtos';
import {HasPermissions, JwtAuthGuard, PermissionsEnum, PermissionsGuard, Role} from '../../authorization';

@ApiTags('roles')
@Controller("roles")
export class RolesController {

    constructor(private rolesService: RolesService) {}

    @UseGuards(JwtAuthGuard, PermissionsGuard)
    @HasPermissions(PermissionsEnum.USER_READ)
    @Get()
    @ApiOkResponse({
        type: [RoleDto]
    })
    @ApiBearerAuth()
    findAll(): Promise<RoleDto[]> {
        return this.rolesService.findAll();
    }

    @UseGuards(JwtAuthGuard, PermissionsGuard)
    @HasPermissions(PermissionsEnum.USER_READ)
    @Get(":name")
    @ApiOkResponse({
        type: RoleDto
    })
    @ApiBearerAuth()
    async findOneByName(@Param("name") name: string): Promise<RoleDto> {
        const role = await this.rolesService.findOneByName(name);
        if (role) {
            return role;
        }
        throw new NotFoundException("Role", `not found for name ${name}`);
    }

}
