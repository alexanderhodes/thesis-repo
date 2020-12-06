import {Injectable, OnDestroy} from '@angular/core';
import {takeUntil} from 'rxjs/operators';
import {ReplaySubject} from 'rxjs';
import {CleanUpHelper} from '../utils';
import {Role, StorageUser} from '../../shared';
import {StateService, STORAGE_USER} from './state.service';
import {RolesEnum} from '../enums';

@Injectable({
  providedIn: 'root'
})
export class RoleService extends CleanUpHelper implements OnDestroy {

  #roles: Role[];
  rolesChanged$: ReplaySubject<boolean>;

  constructor(private stateService: StateService) {
    super();
    this.rolesChanged$ = new ReplaySubject<boolean>(1);
    this.stateService.getItem$(STORAGE_USER)
      .pipe(
        takeUntil(this.onDestroy$)
      )
      .subscribe((data: StorageUser) => {
        this.#roles = data ? data.roles : [];
        this.rolesChanged$.next(true);
      });
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
    this.rolesChanged$.complete();
  }

  hasRole(role: RolesEnum | string): boolean {
    return this.#roles ? !!this.#roles.find(r => r.name === role) : false;
  }

  get roles(): Role[] {
    return this.#roles;
  }

}
