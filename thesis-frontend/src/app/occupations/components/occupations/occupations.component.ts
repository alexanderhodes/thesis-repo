import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'ts-occupations',
  templateUrl: 'occupations.component.html',
  styleUrls: ['occupations.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.Emulated
})
export class OccupationsComponent {

  constructor() {}

}
