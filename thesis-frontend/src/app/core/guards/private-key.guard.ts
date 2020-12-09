import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable, ReplaySubject} from 'rxjs';
import {take} from 'rxjs/operators';
import {StateService, STORAGE_USER} from '../services';
import {StorageUser} from '../../shared';

@Injectable()
export class PrivateKeyGuard implements CanActivate {

  constructor(private stateService: StateService,
              private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const subject$ = new ReplaySubject<boolean>();
    this.stateService.getItem$(STORAGE_USER).pipe(take(1))
      .subscribe((data: StorageUser) => {
        if (data.privateKey) {
          subject$.next(true);
        } else {
          subject$.next(false);
          this.router.navigateByUrl('/login/validate').then();
        }
        subject$.complete();
      });
    return subject$.asObservable();
  }

}
