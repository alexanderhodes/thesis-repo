import {ChangeDetectionStrategy, Component, Input, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'ts-resource-data',
  templateUrl: 'resource-data.component.html',
  styleUrls: ['resource-data.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResourceDataComponent {

  @Input()
  data: { [key: string]: any };

}
