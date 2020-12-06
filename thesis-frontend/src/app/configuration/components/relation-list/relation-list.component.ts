import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {take} from 'rxjs/operators';
import {DbRelation} from '../../../shared';
import {DbRelationApiService} from '../../../core';

@Component({
  selector: 'ts-relation-list',
  templateUrl: 'relation-list.component.html',
  styleUrls: ['relation-list.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RelationListComponent implements OnInit {

  relations: DbRelation[];
  show: boolean = false;

  constructor(private dbRelationApiService: DbRelationApiService,
              private changeDetectorRef: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.dbRelationApiService.findAll()
      .pipe(take(1))
      .subscribe((relations: DbRelation[]) => {
        this.relations = relations;
        this.changeDetectorRef.detectChanges();
      }, () => {
        this.relations = [];
      });
  }

  toggle(): void {
    this.show = !this.show;
  }

  onRelationCreated(createdRelation: DbRelation): void {
    this.relations.push(createdRelation);
  }

  deleteRelation(deletableRelation: DbRelation): void {
    this.dbRelationApiService.deleteRelation(deletableRelation.name)
      .pipe(take(1))
      .subscribe((success) => {
        console.log(`object with name ${deletableRelation.name} deleted`, success);
        const index = this.relations.findIndex(relation => relation.name === deletableRelation.name);
        if (index >= -1) {
          this.relations.splice(index, 1);
          this.changeDetectorRef.detectChanges();
        }
      });
  }

}
