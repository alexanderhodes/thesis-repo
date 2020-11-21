import {Injectable} from '@angular/core';
import {StateService, STORAGE_USER} from './state.service';
import {Permission, StorageUser} from '../interfaces/public-api';
import {CleanUpHelper} from '../helpers/public-api';
import {takeUntil} from 'rxjs/operators';
import {PermissionsEnum} from '../enum/permissions.enum';

@Injectable()
export class PermissionService extends CleanUpHelper {

  #permissions: Permission[];

  constructor(private stateService: StateService) {
    super();
    this.stateService.getItem$(STORAGE_USER)
      .pipe(
        takeUntil(this.onDestroy$)
      ).subscribe((data: StorageUser) => {
        this.#permissions = data ? data.permissions : [];
      }
    );
  }

  hasPermission(permission: PermissionsEnum | string): boolean {
    return !!this.#permissions.find(p => p.name === permission);
  }

  get permissions(): Permission[] {
    return this.#permissions;
  }

}
