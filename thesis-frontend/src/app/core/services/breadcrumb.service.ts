import {Injectable, OnDestroy} from '@angular/core';
import {Observable, ReplaySubject} from 'rxjs';
import {IBreadcrumb} from '../interfaces';

@Injectable({ providedIn: 'root' })
export class BreadcrumbService implements OnDestroy {

  #showBreadcrumb$: ReplaySubject<boolean>;
  #breadcrumbs$: ReplaySubject<IBreadcrumb[]>;
  #breadcrumbs: IBreadcrumb[];

  constructor() {
    this.#showBreadcrumb$ = new ReplaySubject<boolean>(1);
    this.#breadcrumbs$ = new ReplaySubject<IBreadcrumb[]>(1);
  }

  ngOnDestroy(): void {
    this.#breadcrumbs$.complete();
    this.#showBreadcrumb$.complete();
  }

  newBreadcrumb(breadcrumb: IBreadcrumb): void {
    if (!this.#breadcrumbs || this.#breadcrumbs.length === 0) {
      this.startBreadcrumb(breadcrumb);
    } else {
      this.#breadcrumbs.push(breadcrumb);
      this.#breadcrumbs$.next(this.#breadcrumbs);
    }
  }

  startBreadcrumb(startBreadcrumb: IBreadcrumb): void {
    this.#breadcrumbs = [startBreadcrumb];
    this.#breadcrumbs$.next(this.#breadcrumbs);
  }

  removeLastBreadcrumb(): void {
    if (this.#breadcrumbs && this.#breadcrumbs.length > 0) {
      this.#breadcrumbs.splice(this.#breadcrumbs.length - 1, 1);
      this.#breadcrumbs$.next(this.#breadcrumbs);
    }
  }

  showBreadcrumb(show: boolean): void {
    this.#showBreadcrumb$.next(show);
  }

  isShown$(): Observable<boolean> {
    return this.#showBreadcrumb$.asObservable();
  }

  getBreadcrumb$(): Observable<IBreadcrumb[]> {
    return this.#breadcrumbs$.asObservable();
  }

}
