import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {AsyncPipe} from '@angular/common';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {take} from 'rxjs/operators';
import {TranslateService} from '@ngx-translate/core';
import {ObjectApiService, ObjectStructureApiService} from '../../../core/http';
import {IMessage, IObject, IObjectStructure} from '../../../shared/interfaces';

@Component({
  selector: 'ts-object-detail',
  templateUrl: 'update-object.component.html',
  styleUrls: ['update-object.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.Emulated,
  providers: [
    AsyncPipe
  ]
})
export class UpdateObjectComponent implements OnInit {

  updateObjectForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    deletable: new FormControl(true)
  });
  objectStructures: IObjectStructure[];
  submitted: boolean = false;
  message: IMessage;

  object: IObject;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private translateService: TranslateService,
              private asyncPipe: AsyncPipe,
              private objectApiService: ObjectApiService,
              private objectStructureApiService: ObjectStructureApiService,
              private changeDetectorRef: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      const name = params.get('name');
      this.objectApiService.getObjectByName(name).pipe(
        take(1)
      ).subscribe((object: IObject) => {
        this.object = object;
        this.updateObjectForm.setValue({
          name: this.object.name,
          deletable: this.object.deletable
        });
        this.changeDetectorRef.detectChanges();
      });
      this.objectStructureApiService.getObjectStructuresByObject(name).pipe(
        take(1)
      ).subscribe((objectStructures: IObjectStructure[]) => {
        this.objectStructures = objectStructures;
        this.changeDetectorRef.detectChanges();
      });
    });
  }

  updateObject(): void {
    this.submitted = true;
    if (this.updateObjectForm.valid) {
      const object: IObject = {
        name: this.getFormControlFromObjectForm('name').value,
        deletable: this.getFormControlFromObjectForm('deletable').value,
        objectStructure: this.objectStructures
      };

      this.objectApiService.updateObject(object.name, object)
        .pipe(take(1))
        .subscribe((updatedObject: IObject) => {
          if (this.objectStructures && this.objectStructures.length) {
            this.objectStructures.forEach((objectStructure: IObjectStructure) => {
              objectStructure.object = updatedObject;
            });
            // ToDo: change this to update
            this.objectStructureApiService.createObjectStructures(this.objectStructures)
              .pipe(take(1))
              .subscribe((createdObjectStructures: IObjectStructure[]) => {
                updatedObject.objectStructure = createdObjectStructures;
                this._resetForm(updatedObject);
              }, (error) => {
                console.log('error', error);
              });
          } else {
            this._resetForm(updatedObject);
          }
        }, (error) => {
          console.log('error', error);
          if (error && error.status === 409) {
            this.message = {
              type: 'error',
              text: this.asyncPipe.transform(this.translateService.get('common.error.object-name-already-existing', {
                name: object.name
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

  onObjectStructureDelete(objectStructure: IObjectStructure): void {
    const index = this.objectStructures.findIndex(structure => {
      return structure.id === objectStructure.id && structure.field === objectStructure.field;
    });
    if (index > -1) {
      this.objectStructures.splice(index, 1);
    }
  }

  onObjectStructureAdded(objectStructure: IObjectStructure): void {
    this.objectStructures = [...this.objectStructures, objectStructure];
    this.changeDetectorRef.markForCheck();
  }

  getFormControlFromObjectForm(key: string): AbstractControl {
    return this.updateObjectForm.get(key);
  }

  private _resetForm(updatedObject: IObject): void {
    this.message = {
      type: 'success',
      text: this.asyncPipe.transform(this.translateService.get('objects.message.saved'))
    };
    this.updateObjectForm.reset({
      name: updatedObject.name,
      deletable: updatedObject.deletable
    });
    this.submitted = false;
    this.objectStructures = [];
    this.changeDetectorRef.detectChanges();
  }

}
