import {Injectable} from '@angular/core';
import {CleanUpHelper} from '../utils/public-api';
import {Role, StorageUser} from '../../shared/interfaces/public-api';
import {StateService, STORAGE_USER} from './state.service';
import {takeUntil} from 'rxjs/operators';
import {RolesEnum} from '../enums/roles.enum';

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
