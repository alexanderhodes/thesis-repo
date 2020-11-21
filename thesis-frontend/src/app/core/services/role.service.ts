import {Injectable} from '@angular/core';
import {CleanUpHelper} from '../utils';
import {Role, StorageUser} from '../../shared/interfaces';
import {StateService, STORAGE_USER} from './state.service';
import {takeUntil} from 'rxjs/operators';
import {RolesEnum} from '../enums';

@Injectable()
export class RoleService extends CleanUpHelper {

  #roles: Role[];

  constructor(private stateService: StateService) {
    super();
    this.stateService.getItem$(STORAGE_USER)
      .pipe(
        takeUntil(this.onDestroy$)
      )
      .subscribe((data: StorageUser) => {
        this.#roles = data ? data.roles : [];
      });
  }

  hasRole(role: RolesEnum | string): boolean {
    return !!this.#roles.find(r => r.name === role);
  }

  get roles(): Role[] {
    return this.#roles;
  }

}
