import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';
import {IObjectStructure} from '../../../shared';

@Component({
  selector: 'ts-object-structure-list',
  templateUrl: 'object-structure-list.component.html',
  styleUrls: ['object-structure-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.Emulated
})
export class ObjectStructureListComponent {

  @Input()
  objectStructures: IObjectStructure[];
  @Output()
  deletedObjectStructure: EventEmitter<IObjectStructure>;

  constructor() {
    this.deletedObjectStructure = new EventEmitter<IObjectStructure>();
  }

  deleteObjectStructure(objectStructure: IObjectStructure): void {
    this.deletedObjectStructure.emit(objectStructure);
  }

}
