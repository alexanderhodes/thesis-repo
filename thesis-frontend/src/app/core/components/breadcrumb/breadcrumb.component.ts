import {ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Observable} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {BreadcrumbService} from '../../services';
import {CleanUpHelper} from '../../utils';
import {IBreadcrumb} from '../../interfaces';
import {Router} from '@angular/router';

@Component({
  selector: 'ts-breadcrumb',
  templateUrl: 'breadcrumb.component.html',
  styleUrls: ['breadcrumb.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.Emulated
})
export class BreadcrumbComponent extends CleanUpHelper implements OnInit {

  show$: Observable<boolean>;
  breadcrumbs$: Observable<IBreadcrumb[]>;

  constructor(private breadcrumbService: BreadcrumbService,
              private router: Router) {
    super();
  }

  ngOnInit(): void {
    this.show$ = this.breadcrumbService.isShown$().pipe(takeUntil(this.onDestroy$));
    this.breadcrumbs$ = this.breadcrumbService.getBreadcrumb$().pipe(takeUntil(this.onDestroy$));
  }

  navigate(url: string): void {
    this.router.navigateByUrl(url).then();
  }

}
