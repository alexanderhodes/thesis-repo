import {ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'ts-configuration',
  templateUrl: 'configuration.component.html',
  styleUrls: ['configuration.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfigurationComponent implements OnInit {

  constructor() {}

  ngOnInit(): void {}

}
