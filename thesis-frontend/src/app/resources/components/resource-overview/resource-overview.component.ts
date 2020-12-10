import {ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {ReplaySubject, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {BreadcrumbService, CleanUpHelper, StateService, STORAGE_USER, TransactionsApiService} from '../../../core';
import {Asset, StorageUser, UuidService} from '../../../shared';

@Component({
  selector: 'ts-resource-overview',
  templateUrl: 'resource-overview.component.html',
  styleUrls: ['resource-overview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.Emulated
})
export class ResourceOverviewComponent extends CleanUpHelper implements OnInit {

  resourceCreated$: Subject<Asset>;
  #publicKey: string;

  constructor(private transactionApiService: TransactionsApiService,
              private uuidService: UuidService,
              private breadcrumbService: BreadcrumbService,
              private router: Router,
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
      text: 'Ressourcen',
      url: this.router.url
    });
    this.breadcrumbService.showBreadcrumb(true);
  }

  onResourceCreated(asset: Asset): void {
    this.resourceCreated$.next(asset);
  }

}
