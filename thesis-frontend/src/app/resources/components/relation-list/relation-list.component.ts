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
  selector: 'ts-relation-list',
  templateUrl: 'relation-list.component.html',
  styleUrls: ['relation-list.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RelationListComponent implements OnInit {

  @Input()
  relations: GraphRelationsResponse[];
  @Output()
  reloadRelations: EventEmitter<void>;
  @Output()
  deletedRelation: EventEmitter<GraphRelationsResponse>;

  #relations: DbRelation[];

  constructor(private relationApiService: DbRelationApiService,
              private changeDetectorRef: ChangeDetectorRef) {
    this.reloadRelations = new EventEmitter<void>();
    this.deletedRelation = new EventEmitter<GraphRelationsResponse>();
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

  deleteRelation(relation: GraphRelationsResponse): void {
    this.deletedRelation.emit(relation);
  }

  private getStoredRelationName(relationName: string): string {
    return relationName ? relationName.toLowerCase().split(' ').join('') : '';
  }

}
