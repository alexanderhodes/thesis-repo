import {Component, Input} from '@angular/core';

@Component({
  selector: 'ts-trash',
  templateUrl: 'trash.component.svg'
})
export class TrashComponent {

  @Input()
  sideClasses: string = '';
  @Input()
  style: string = '';

}
