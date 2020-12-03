import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';
import {DbRelationStructure} from '../../../shared/interfaces';

@Component({
  selector: 'ts-relation-structure-list',
  templateUrl: 'relation-structure-list.component.html',
  styleUrls: ['relation-structure-list.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RelationStructureListComponent {

  @Input()
  relationStructures: DbRelationStructure[];
  @Output()
  deletedRelationStructure: EventEmitter<DbRelationStructure>;

  constructor() {
    this.deletedRelationStructure = new EventEmitter<DbRelationStructure>();
  }

  deleteRelationStructure(relationStructure: DbRelationStructure): void {
    this.deletedRelationStructure.emit(relationStructure);
  }

}
