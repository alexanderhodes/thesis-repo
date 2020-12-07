import {ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {take, takeUntil} from 'rxjs/operators';
import {CleanUpHelper, StateService, STORAGE_USER, TransactionsApiService} from '../../../core';
import {Asset, KeyPair, Occupation, Qualification, Relation, Resource, StorageUser, UuidService} from '../../../shared';

@Component({
  selector: 'ts-resource-overview',
  templateUrl: 'resource-overview.component.html',
  styleUrls: ['resource-overview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.Emulated
})
export class ResourceOverviewComponent extends CleanUpHelper implements OnInit {

  #publicKey: string;

  constructor(private transactionApiService: TransactionsApiService,
              private uuidService: UuidService,
              private stateService: StateService) {
    super();
  }

  ngOnInit(): void {
    this.stateService.getItem$(STORAGE_USER)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((data: StorageUser) => {
        this.#publicKey = data && data.publicKey ? data.publicKey : null;
      });
  }

  onResourceCreated(asset: Asset): void {
    console.log('asset', asset);
  }

}
