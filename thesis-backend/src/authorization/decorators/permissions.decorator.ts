import {SetMetadata} from '@nestjs/common';

export const Permissions = (...permissions: (Permissions | string)[]) =>
    SetMetadata('permissions', permissions);
