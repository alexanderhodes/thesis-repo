import {ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {ReplaySubject, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {BreadcrumbService, CleanUpHelper, StateService, STORAGE_USER, TransactionsApiService} from '../../../core';
import {Asset, StorageUser, UuidService} from '../../../shared';
import {AsyncPipe} from '@angular/common';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'ts-resource-overview',
  templateUrl: 'resource-overview.component.html',
  styleUrls: ['resource-overview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.Emulated,
  providers: [
    AsyncPipe
  ]
})
export class ResourceOverviewComponent extends CleanUpHelper implements OnInit {

  resourceCreated$: Subject<Asset>;
  #publicKey: string;

  constructor(private transactionApiService: TransactionsApiService,
              private uuidService: UuidService,
              private breadcrumbService: BreadcrumbService,
              private router: Router,
              private translateService: TranslateService,
              private asyncPipe: AsyncPipe,
              private stateService: StateService) {
    super();
    this.resourceCreated$ = new ReplaySubject(1);
  }

  ngOnInit(): void {
    this.stateService.getItem$(STORAGE_USER)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((data: StorageUser) => {
        this.#publicKey = data && data.publicKey ? data.publicKey : null;
      });
    this.breadcrumbService.startBreadcrumb({
      text: this.asyncPipe.transform(this.translateService.get('common.resources')),
      url: this.router.url
    });
    this.breadcrumbService.showBreadcrumb(true);
  }

  onResourceCreated(asset: Asset): void {
    this.resourceCreated$.next(asset);
  }

}
