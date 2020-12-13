import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AsyncPipe} from '@angular/common';
import {TranslateService} from '@ngx-translate/core';
import {take} from 'rxjs/operators';
import {BreadcrumbService, StateService, STORAGE_TEMP} from '../../../core';
import {AssetTransaction} from '../../../shared';

@Component({
  selector: 'ts-resource-detail-transaction-detail',
  templateUrl: 'transaction-detail.component.html',
  styleUrls: ['transaction-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.Emulated,
  providers: [
    AsyncPipe
  ]
})
export class TransactionDetailComponent implements OnInit {

  transaction: AssetTransaction;
  transactionId: string;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private asyncPipe: AsyncPipe,
              private translateService: TranslateService,
              private stateService: StateService,
              private breadcrumbService: BreadcrumbService,
              private changeDetectorRef: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.transactionId = this.activatedRoute.snapshot.params.transaction;
    console.log('transaction', this.transactionId);
    this.stateService.getItem$(STORAGE_TEMP)
      .pipe(take(1)).subscribe((assetTransaction: AssetTransaction) => {
        console.log('assetTransaction', assetTransaction);
        this.transaction = assetTransaction;
    });

    this.breadcrumbService.newBreadcrumb({
      text: this.asyncPipe.transform(this.translateService.get('common.transaction')),
      url: this.router.url
    });
  }

}
