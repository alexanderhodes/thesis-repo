import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {PermissionService} from '../services/permission.service';
import {Observable} from 'rxjs';
import {GuardData} from '../interfaces/public-api';

@Injectable()
export class PermissionRouteGuard implements CanActivate {

  constructor(private permissionService: PermissionService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const guardData: GuardData = route.data as GuardData;
    if (guardData.permissions && guardData.permissions.length) {
      let isAllowed: boolean = false;
      guardData.permissions.forEach(permission => {
        const hasPermission = this.permissionService.hasPermission(permission);
        if (hasPermission) {
          isAllowed = true;
        }
      });
      return isAllowed;
    }
    return true;
  }

}
