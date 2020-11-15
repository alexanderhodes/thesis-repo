import {CanActivate, ExecutionContext, Injectable} from '@nestjs/common';
import {Reflector} from '@nestjs/core';
import {Observable} from 'rxjs';
import {Permission, Role} from '../interfaces';

@Injectable()
export class PermissionsGuard implements CanActivate {

    constructor(private readonly reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const routePermissions = this.reflector.get<string[]>(
            'permissions',
            context.getHandler()
        );

        const userRoles: Role[] = context.getArgs()[0].user.roles;
        const permissionNames: string[] = [];

        userRoles.forEach((role: Role) => {
            role.permissions.forEach((permission: Permission) => {
                if (permissionNames.indexOf(permission.name) === -1) {
                    permissionNames.push(permission.name);
                }
            });
        });

        if (!routePermissions) {
            return true;
        }

        const hasPermission = () =>
            routePermissions.every(routePermission =>
                permissionNames && permissionNames.includes(routePermission.toUpperCase())
            );

        return hasPermission();
    }

}
