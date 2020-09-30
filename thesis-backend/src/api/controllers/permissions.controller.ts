import {Controller, Get} from '@nestjs/common';
import {PermissionsService} from '../../database/services';

@Controller("api/permissions")
export class PermissionsController {

    constructor(private permissionsService: PermissionsService) {}

    @Get()
    findAllPermissions() {
        return this.permissionsService.findAll();
    }


}
