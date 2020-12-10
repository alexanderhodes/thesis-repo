import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Observable} from 'rxjs';
import {map, takeUntil} from 'rxjs/operators';
import {BreadcrumbService} from '../../services';
import {CleanUpHelper} from '../../utils';
import {IBreadcrumb} from '../../interfaces';

@Component({
  selector: 'ts-breadcrumb',
  templateUrl: 'breadcrumb.component.html',
  styleUrls: ['breadcrumb.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.Emulated
})
export class BreadcrumbComponent extends CleanUpHelper implements OnInit {

  show: boolean;
  breadcrumbs: IBreadcrumb[];

  constructor(private breadcrumbService: BreadcrumbService,
              private changeDetectorRef: ChangeDetectorRef) {
    super();
  }

  ngOnInit(): void {
    this.breadcrumbService.isShown$().pipe(takeUntil(this.onDestroy$)).subscribe(show => {
      console.log('show', show);
      this.show = show;
      this.changeDetectorRef.detectChanges();
    });
    this.breadcrumbService.getBreadcrumb$().pipe(takeUntil(this.onDestroy$)).subscribe(breadcrumbs => {
      this.breadcrumbs = breadcrumbs;
      console.log('breadcrumbs', this.breadcrumbs);
      this.changeDetectorRef.detectChanges();
    });
  }

}
