import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Output,
  ViewEncapsulation
} from '@angular/core';
import {DbRelation, DbRelationStructure, IMessage} from '../../../shared/interfaces';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {DbRelationApiService, DbRelationStructureApiService} from '../../../core/http';
import {AsyncPipe} from '@angular/common';
import {TranslateService} from '@ngx-translate/core';
import {take} from 'rxjs/operators';

@Component({
  selector: 'ts-create-relation',
  templateUrl: 'create-relation.component.html',
  styleUrls: ['create-relation.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    AsyncPipe
  ]
})
export class CreateRelationComponent {

  @Output()
  relationCreated: EventEmitter<DbRelation>;

  createRelationForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required])
  });
  relationStructures: DbRelationStructure[];
  submitted: boolean = false;
  message: IMessage;

  constructor(private dbRelationApiService: DbRelationApiService,
              private dbRelationStructureApiService: DbRelationStructureApiService,
              private asyncPipe: AsyncPipe,
              private translateService: TranslateService,
              private changeDetectorRef: ChangeDetectorRef) {
    this.relationStructures = [];
    this.relationCreated = new EventEmitter<DbRelation>();
  }

  createRelation(): void {
    this.submitted = true;
    if (this.createRelationForm.valid) {
      const relation: DbRelation = {
        name: this.getFormControl('name').value
      };

      this.dbRelationApiService.createRelation(relation)
        .pipe(take(1))
        .subscribe((createdRelation: DbRelation) => {
          if (this.relationStructures && this.relationStructures.length) {
            this.relationStructures.forEach((relationStructure: DbRelationStructure) => {
              relationStructure.relation = createdRelation;
            });
            this.dbRelationStructureApiService.createRelationStructures(this.relationStructures)
              .pipe(take(1))
              .subscribe((createdObjectStructures: DbRelationStructure[]) => {
                createdRelation.relationStructures = createdObjectStructures;
                this.relationCreated.emit(createdRelation);
                this._resetForms();
              }, (error) => {
                console.log('error', error);
              });
          } else {
            this.relationCreated.emit(createdRelation);
            this._resetForms();
          }
        }, (error) => {
          console.log('error', error);
          if (error && error.status === 409) {
            this.message = {
              type: 'error',
              text: this.asyncPipe.transform(this.translateService.get('common.error.object-name-already-existing', {
                name: relation.name
              }))
            };
          } else {
            this.message = {
              type: 'error',
              text: this.asyncPipe.transform(this.translateService.get('common.error.no-internet-connection'))
            };
          }
          this.changeDetectorRef.detectChanges();
        });
    }
  }

  onRelationStructureDelete(relationStructure: DbRelationStructure): void {
    const index = this.relationStructures.findIndex(structure => {
      return structure.id === relationStructure.id && structure.field === relationStructure.field;
    });
    if (index > -1) {
      this.relationStructures.splice(index, 1);
    }
  }

  onRelationStructureAdded(relationStructure: DbRelationStructure): void {
    this.relationStructures = [...this.relationStructures, relationStructure];
    this.changeDetectorRef.markForCheck();
  }

  getFormControl(key: string): AbstractControl {
    return this.createRelationForm.get(key);
  }

  private _resetForms(): void {
    this.message = {
      type: 'success',
      text: this.asyncPipe.transform(this.translateService.get('objects.message.created'))
    };
    this.createRelationForm.reset({
      name: ''
    });
    this.submitted = false;
    this.relationStructures = [];
    this.changeDetectorRef.detectChanges();
  }

}
