import {Injectable, OnDestroy} from '@angular/core';
import {takeUntil} from 'rxjs/operators';
import {ReplaySubject} from 'rxjs';
import {StateService, STORAGE_USER} from './state.service';
import {Permission, StorageUser} from '../../shared/interfaces';
import {CleanUpHelper} from '../utils';
import {PermissionsEnum} from '../enums';

@Injectable({
  providedIn: 'root'
})
export class PermissionService extends CleanUpHelper implements OnDestroy {

  #permissions: Permission[];
  permissionsChanged$: ReplaySubject<boolean>;

  constructor(private stateService: StateService) {
    super();
    this.permissionsChanged$ = new ReplaySubject<boolean>(1);
    this.stateService.getItem$(STORAGE_USER)
      .pipe(
        takeUntil(this.onDestroy$)
      ).subscribe((data: StorageUser) => {
        this.#permissions = data ? data.permissions : [];
        this.permissionsChanged$.next(true);
      }
    );
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
    this.permissionsChanged$.complete();
  }

  hasPermission(permission: PermissionsEnum | string): boolean {
    return this.#permissions ? !!this.#permissions.find(p => p.name === permission) : false;
  }

  get permissions(): Permission[] {
    return this.#permissions;
  }

}
