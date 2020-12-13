import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {AssetTransaction} from '../../../shared';
import {StateService, STORAGE_TEMP} from '../../../core';

@Component({
  selector: 'ts-transactions',
  templateUrl: 'transactions.component.html',
  styleUrls: ['transactions.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TransactionsComponent {

  @Input()
  transactions: AssetTransaction[];
  @Output()
  reloadTransactions: EventEmitter<void>;

  constructor(private router: Router,
              private stateService: StateService) {
    this.reloadTransactions = new EventEmitter<void>();
  }

  reload(): void {
    this.reloadTransactions.emit();
  }

  toTransactionDetail(assetTransaction: AssetTransaction): void {
    console.log('assetTransaction', assetTransaction);
    const end = this.router.url.indexOf('?custom');
    const url = end > 0 ? this.router.url.substring(0, end) : this.router.url;
    console.log('url', url, this.router.url, end, this.router.url.indexOf('?custom'));
    this.stateService.setItem(STORAGE_TEMP, assetTransaction);
    this.router.navigate([`${url}/${assetTransaction.transaction.id}`], {
      state: {
        transaction: assetTransaction
      }
    }).then();
  }

}
