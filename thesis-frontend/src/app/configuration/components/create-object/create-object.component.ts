import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {take} from 'rxjs/operators';
import {ObjectApiService, ObjectStructureApiService} from '../../../core/http';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {IObject, IObjectStructure} from '../../../shared/interfaces';

@Component({
  selector: 'ts-create-object',
  templateUrl: 'create-object.component.html',
  styleUrls: ['create-object.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateObjectComponent implements OnInit {

  createObjectForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    deletable: new FormControl(false)
  });
  addObjectStructureForm: FormGroup = new FormGroup({
    field: new FormControl('', [Validators.required]),
    datatype: new FormControl('', [Validators.required]),
    schema: new FormControl('', [Validators.required]),
    nullable: new FormControl(false),
    deletable: new FormControl(false)
  });
  objectStructures: IObjectStructure[];

  constructor(private objectApiService: ObjectApiService,
              private objectStructureApiService: ObjectStructureApiService,
              private changeDetectorRef: ChangeDetectorRef) {
    this.objectStructures = [];
  }

  ngOnInit(): void {}

  createObject(): void {
    if (this.createObjectForm.valid) {
      const object: IObject = {
        name: this.getFormControlFromObjectForm('name').value,
        deletable: this.getFormControlFromObjectForm('deletable').value,
        objectStructure: this.objectStructures
      };

      this.objectApiService.createObject(object)
        .pipe(take(1))
        .subscribe((createdObject: IObject) => {
          this.objectStructures.forEach((objectStructure: IObjectStructure) => {
            objectStructure.object = createdObject;
          });
          this.objectStructureApiService.createObjectStructures(this.objectStructures)
            .pipe(take(1))
            .subscribe((createdObjectStructures: IObjectStructure[]) => {
              this.createObjectForm.reset({
                name: '',
                deletable: false
              });
              this.objectStructures = [];
              this._clearObjectStructureForm();
            }, (error) => {
              console.log('error', error);
            });
        }, (error) => {
          console.log('error', error);
        });
    }
  }

  addObjectStructure(): void {
    if (this.addObjectStructureForm.valid) {
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
      deletable: false
    });
    this.changeDetectorRef.detectChanges();
  }

}
