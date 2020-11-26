import {Component, Input} from '@angular/core';

@Component({
  selector: 'ts-chevron-down',
  templateUrl: 'chevron-down.component.svg'
})
export class ChevronDownComponent {

  @Input()
  color: string = 'black';
  @Input()
  sideClasses: string = '';
  @Input()
  style: string = '';

}
