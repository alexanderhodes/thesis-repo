import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation
} from '@angular/core';
import {take} from 'rxjs/operators';
import {DbRelation, GraphRelationsResponse} from '../../../shared';
import {DbRelationApiService} from '../../../core';

@Component({
  selector: 'ts-resource-detail-relations',
  templateUrl: 'resource-detail-relations.component.html',
  styleUrls: ['resource-detail-relations.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResourceDetailRelationsComponent implements OnInit {

  @Input()
  relations: GraphRelationsResponse[];
  @Output()
  reloadRelations: EventEmitter<void>;

  #relations: DbRelation[];

  constructor(private relationApiService: DbRelationApiService,
              private changeDetectorRef: ChangeDetectorRef) {
    this.reloadRelations = new EventEmitter<void>();
  }

  ngOnInit(): void {
    this.relationApiService.findAll().pipe(take(1))
      .subscribe((relations) => {
        this.#relations = relations;
        this.changeDetectorRef.detectChanges();
      });
  }

  reload(): void {
    this.reloadRelations.emit();
  }

  getNameForRelation(relationName: string): string {
    if (this.#relations) {
      const foundRelation = this.#relations.find(relation => this.getStoredRelationName(relation.name) === relationName);
      return foundRelation ? foundRelation.name : relationName;
    }
    return relationName;
  }

  private getStoredRelationName(relationName: string): string {
    return relationName ? relationName.toLowerCase().split(' ').join('') : '';
  }

}
