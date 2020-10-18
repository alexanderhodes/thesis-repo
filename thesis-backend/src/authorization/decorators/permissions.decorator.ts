import {SetMetadata} from '@nestjs/common';
import {PermissionsEnum} from '../constants';

export const HasPermissions = (...permissions: (PermissionsEnum | string)[]) =>
    SetMetadata('permissions', permissions);
