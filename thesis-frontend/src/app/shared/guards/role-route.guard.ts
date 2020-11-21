import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {GuardData} from '../interfaces/public-api';
import {RoleService} from '../services/role.service';

@Injectable()
export class RoleRouteGuard implements CanActivate {

  constructor(private roleService: RoleService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    console.log('data', route.data);
    console.log('roles', this.roleService.roles);
    const guardData: GuardData = route.data as GuardData;
    if (guardData.roles && guardData.roles.length) {
      guardData.roles.forEach(role => {
        const hasRole = this.roleService.hasRole(role.name);
        if (hasRole) {
          return true;
        }
      });
      return false;
    }
    return true;
  }

}
