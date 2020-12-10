import {ChangeDetectionStrategy, Component, Input, ViewEncapsulation} from '@angular/core';
import {AssetTransaction} from '../../../shared';

@Component({
  selector: 'ts-resource-detail-transactions',
  templateUrl: 'resource-detail-transactions.component.html',
  styleUrls: ['resource-detail-transactions.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResourceDetailTransactionsComponent {

  @Input()
  transactions: AssetTransaction[];

}
