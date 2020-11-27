import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewEncapsulation
} from '@angular/core';
import {AsyncPipe} from '@angular/common';
import {take} from 'rxjs/operators';
import {TranslateService} from '@ngx-translate/core';
import {ObjectApiService, ObjectStructureApiService} from '../../../core/http';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
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
export class CreateObjectComponent implements OnInit {

  @Output()
  objectCreated: EventEmitter<IObject>;

  createObjectForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    deletable: new FormControl(true)
  });
  addObjectStructureForm: FormGroup = new FormGroup({
    field: new FormControl('', [Validators.required]),
    datatype: new FormControl('', [Validators.required]),
    schema: new FormControl('', [Validators.required]),
    nullable: new FormControl(false),
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

  ngOnInit(): void {}

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

  addObjectStructure(): void {
    console.log('adding object-structure', this.addObjectStructureForm.value, this.addObjectStructureForm.valid);
    if (!this._hasFieldInObjectStructure() && this.addObjectStructureForm.valid) {
      const objectStructure: IObjectStructure = {
        field: this.getFormControlFromObjectStructureForm('field').value,
        datatype: this.getFormControlFromObjectStructureForm('datatype').value,
        schema: this.getFormControlFromObjectStructureForm('schema').value,
        nullable: this.getFormControlFromObjectStructureForm('nullable').value,
        deletable: this.getFormControlFromObjectStructureForm('deletable').value
      };
      this.objectStructures.push(objectStructure);
      this._clearObjectStructureForm();
    }
  }

  deleteObjectStructure(index: number): void {
    if (this.objectStructures[index]) {
      this.objectStructures.splice(index, 1);
      // this.changeDetectorRef.detectChanges();
    }
  }

  getFormControlFromObjectForm(key: string): AbstractControl {
    return this.createObjectForm.get(key);
  }

  getFormControlFromObjectStructureForm(key: string): AbstractControl {
    return this.addObjectStructureForm.get(key);
  }

  private _clearObjectStructureForm(): void {
    this.addObjectStructureForm.reset({
      field: '',
      datatype: '',
      schema: '',
      nullable: false,
      deletable: true
    });
    this.changeDetectorRef.detectChanges();
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
    this._clearObjectStructureForm();
  }

  private _hasFieldInObjectStructure(): boolean {
    const fieldControl = this.getFormControlFromObjectStructureForm('field');
    const foundObjectStructure = this.objectStructures.find(structure => structure.field === fieldControl.value);
    if (foundObjectStructure) {
      console.log('foundObjectStructure', foundObjectStructure);
      fieldControl.setErrors({
        fieldNameExisting: true
      });
      return true;
    }
    return false;
  }

}
