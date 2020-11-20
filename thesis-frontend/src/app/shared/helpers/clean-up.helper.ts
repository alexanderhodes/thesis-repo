import {OnDestroy} from '@angular/core';
import {Subject} from 'rxjs';

export class CleanUpHelper implements OnDestroy {

  onDestroy$: Subject<void>;

  constructor() {
    this.onDestroy$ = new Subject<void>();
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
  }

}
