import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Output,
  ViewEncapsulation
} from '@angular/core';
import {AsyncPipe} from '@angular/common';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {take} from 'rxjs/operators';
import {TranslateService} from '@ngx-translate/core';
import {ObjectApiService, ObjectStructureApiService} from '../../../core/http';
import {IMessage, IObject, IObjectStructure} from '../../../shared/interfaces';

@Component({
  selector: 'ts-create-object',
  templateUrl: 'create-object.component.html',
  styleUrls: ['create-object.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    AsyncPipe
  ]
})
export class CreateObjectComponent {

  @Output()
  objectCreated: EventEmitter<IObject>;

  createObjectForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    deletable: new FormControl(true)
  });
  objectStructures: IObjectStructure[];
  submitted: boolean = false;
  message: IMessage;

  constructor(private objectApiService: ObjectApiService,
              private objectStructureApiService: ObjectStructureApiService,
              private asyncPipe: AsyncPipe,
              private translateService: TranslateService,
              private changeDetectorRef: ChangeDetectorRef) {
    this.objectStructures = [];
    this.objectCreated = new EventEmitter<IObject>();
  }

  createObject(): void {
    this.submitted = true;
    if (this.createObjectForm.valid) {
      const object: IObject = {
        name: this.getFormControlFromObjectForm('name').value,
        deletable: this.getFormControlFromObjectForm('deletable').value,
        objectStructure: this.objectStructures
      };

      this.objectApiService.createObject(object)
        .pipe(take(1))
        .subscribe((createdObject: IObject) => {
          if (this.objectStructures && this.objectStructures.length) {
            this.objectStructures.forEach((objectStructure: IObjectStructure) => {
              objectStructure.object = createdObject;
            });
            this.objectStructureApiService.createObjectStructures(this.objectStructures)
              .pipe(take(1))
              .subscribe((createdObjectStructures: IObjectStructure[]) => {
                createdObject.objectStructure = createdObjectStructures;
                this.objectCreated.emit(createdObject);
                this._resetForms();
              }, (error) => {
                console.log('error', error);
              });
          } else {
            this.objectCreated.emit(createdObject);
            this._resetForms();
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
    return this.createObjectForm.get(key);
  }

  private _resetForms(): void {
    this.message = {
      type: 'success',
      text: this.asyncPipe.transform(this.translateService.get('objects.message.created'))
    };
    this.createObjectForm.reset({
      name: '',
      deletable: true
    });
    this.submitted = false;
    this.objectStructures = [];
    this.changeDetectorRef.detectChanges();
  }

}
