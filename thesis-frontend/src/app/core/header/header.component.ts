import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {map, takeUntil} from 'rxjs/operators';
import {StateService, STORAGE_USER} from '../services';
import {CleanUpHelper} from '../utils';
import {StorageUser} from '../../shared';

@Component({
  selector: 'ts-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
  encapsulation: ViewEncapsulation.Emulated
})
export class HeaderComponent extends CleanUpHelper implements OnInit {

  username$: Observable<string>;

  constructor(private stateService: StateService,
              private router: Router,
              private changeDetectorRef: ChangeDetectorRef) {
    super();
  }

  ngOnInit() {
    this.username$ = this.stateService.getItem$(STORAGE_USER).pipe(
      takeUntil(this.onDestroy$),
      map((value: StorageUser) => value && value.username ? value.username : null)
    );
    this.stateService.getItem$(STORAGE_USER).pipe(
      takeUntil(this.onDestroy$)
    ).subscribe(() => {
      this.changeDetectorRef.detectChanges();
    });
  }

  logout(): void {
    this.stateService.clear();
    this.router.navigate(['/login']).then();
  }

}
