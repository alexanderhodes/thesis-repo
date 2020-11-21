import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {GuardData} from '../interfaces/public-api';
import {RoleService} from '../services/role.service';

@Injectable()
export class RoleRouteGuard implements CanActivate {

  constructor(private roleService: RoleService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const guardData: GuardData = route.data as GuardData;
    if (guardData.roles && guardData.roles.length) {
      let isAllowed: boolean = false;
      guardData.roles.forEach(role => {
        const hasRole = this.roleService.hasRole(role);
        if (hasRole) {
          isAllowed = true;
        }
      });
      return isAllowed;
    }
    return true;
  }

}
