import {Component, Input} from '@angular/core';

@Component({
  selector: 'ts-chevron-up',
  templateUrl: 'chevron-up.component.svg'
})
export class ChevronUpComponent {

  @Input()
  color: string = 'black';
  @Input()
  sideClasses: string = '';
  @Input()
  style: string = '';

}
