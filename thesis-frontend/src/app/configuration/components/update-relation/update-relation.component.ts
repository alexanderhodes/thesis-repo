import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AsyncPipe} from '@angular/common';
import {take} from 'rxjs/operators';
import {TranslateService} from '@ngx-translate/core';
import {DbRelation, DbRelationStructure, IMessage, IObject, UpdateRelationStructure} from '../../../shared';
import {DbRelationApiService, DbRelationStructureApiService} from '../../../core';

@Component({
  selector: 'ts-update-relation',
  templateUrl: 'update-relation.component.html',
  styleUrls: ['update-relation.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    AsyncPipe
  ]
})
export class UpdateRelationComponent implements OnInit {

  updateRelationForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required])
  });
  relationStructures: DbRelationStructure[];
  deletedRelationStructures: DbRelationStructure[];
  submitted: boolean = false;
  message: IMessage;
  relation: DbRelation;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private translateService: TranslateService,
              private asyncPipe: AsyncPipe,
              private dbRelationApiService: DbRelationApiService,
              private dbRelationStructureApiService: DbRelationStructureApiService,
              private changeDetectorRef: ChangeDetectorRef) {
    this.deletedRelationStructures = [];
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      const name = params.get('name');
      this.dbRelationApiService.findOneRelationByName(name).pipe(
        take(1)
      ).subscribe((relation: IObject) => {
        this.relation = relation;
        this.updateRelationForm.setValue({
          name: this.relation.name
        });
        this.changeDetectorRef.detectChanges();
      });
      this.dbRelationStructureApiService.findAllForRelation(name).pipe(
        take(1)
      ).subscribe((relationStructures: DbRelationStructure[]) => {
        this.relationStructures = relationStructures;
        this.changeDetectorRef.detectChanges();
      });
    });
  }

  updateRelation(): void {
    this.submitted = true;
    if (this.updateRelationForm.valid) {
      const relation: DbRelation = {
        name: this.getFormControl('name').value
      };

      this.dbRelationApiService.updateRelation(relation.name, relation)
        .pipe(take(1))
        .subscribe((updatedRelation: DbRelation) => {
          if ((this.relationStructures && this.relationStructures.length > 0) || (this.deletedRelationStructures &&
            this.deletedRelationStructures.length > 0)) {
            // collect all object structures which should be stored
            const updateRelationStructures: UpdateRelationStructure[] = this.createUpdateRelationStructures(updatedRelation);
            console.log('updateRelationStructures', updateRelationStructures);
            this.dbRelationStructureApiService.updateRelationStructures(updateRelationStructures)
              .pipe(take(1))
              .subscribe((updatedObjectStructures) => {
                console.log('response', updatedObjectStructures);
                this._resetForm(updatedRelation);
              }, (error) => {
                console.log('error', error);
              });
          } else {
            this._resetForm(updatedRelation);
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

  private createUpdateRelationStructures(updateRelation: DbRelation): UpdateRelationStructure[] {
    const updatedRelationStructures: UpdateRelationStructure[] = [];
    this.relationStructures.forEach((relationStructure: DbRelationStructure) => {
      relationStructure.relation = updateRelation;
      updatedRelationStructures.push({
        relationStructure,
        type: relationStructure.id ? 'UPDATE' : 'CREATE'
      });
    });
    this.deletedRelationStructures.forEach((relationStructure: DbRelationStructure) => {
      updatedRelationStructures.push({
        relationStructure,
        type: 'DELETE'
      });
    });
    return updatedRelationStructures;
  }

  onRelationStructureDelete(relationStructure: DbRelationStructure): void {
    const index = this.relationStructures.findIndex(structure => {
      return structure.id === relationStructure.id && structure.field === relationStructure.field;
    });
    if (index > -1) {
      this.relationStructures.splice(index, 1);
      this.deletedRelationStructures.push(relationStructure);
    }
  }

  onRelationStructureAdded(relationStructure: DbRelationStructure): void {
    this.relationStructures = [...this.relationStructures, relationStructure];
    this.changeDetectorRef.markForCheck();
  }

  getFormControl(key: string): AbstractControl {
    return this.updateRelationForm.get(key);
  }

  private _resetForm(updatedRelation: DbRelation): void {
    this.message = {
      type: 'success',
      text: this.asyncPipe.transform(this.translateService.get('objects.message.saved'))
    };
    this.updateRelationForm.reset({
      name: updatedRelation.name
    });
    this.submitted = false;
    this.deletedRelationStructures = [];
    this.changeDetectorRef.detectChanges();
  }
}
