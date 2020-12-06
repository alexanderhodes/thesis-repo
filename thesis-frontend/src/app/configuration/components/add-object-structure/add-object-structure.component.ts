import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation
} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {IObjectStructure} from '../../../shared';

@Component({
  selector: 'ts-add-object-structure',
  templateUrl: 'add-object-structure.component.html',
  styleUrls: ['add-object-structure.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.Emulated
})
export class AddObjectStructureComponent {

  @Input()
  objectStructures: IObjectStructure[];
  @Output()
  addedObjectStructure: EventEmitter<IObjectStructure>;

  addObjectStructureForm: FormGroup = new FormGroup({
    field: new FormControl('', [Validators.required]),
    datatype: new FormControl('', [Validators.required]),
    schema: new FormControl('', [Validators.required]),
    nullable: new FormControl(false),
    deletable: new FormControl(true)
  });

  constructor(private changeDetectorRef: ChangeDetectorRef) {
    this.addedObjectStructure = new EventEmitter<IObjectStructure>();
  }

  addObjectStructure(): void {
    if (!this._hasFieldInObjectStructure() && this.addObjectStructureForm.valid) {
      const objectStructure: IObjectStructure = {
        field: this.getFormControlFromObjectStructureForm('field').value,
        datatype: this.getFormControlFromObjectStructureForm('datatype').value,
        schema: this.getFormControlFromObjectStructureForm('schema').value,
        nullable: this.getFormControlFromObjectStructureForm('nullable').value,
        deletable: this.getFormControlFromObjectStructureForm('deletable').value
      };
      this.addedObjectStructure.emit(objectStructure);
      this._clearObjectStructureForm();
    }
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

  private _hasFieldInObjectStructure(): boolean {
    const fieldControl = this.getFormControlFromObjectStructureForm('field');
    const foundObjectStructure = this.objectStructures.find(structure => structure.field === fieldControl.value);
    if (foundObjectStructure) {
      fieldControl.setErrors({
        fieldNameExisting: true
      });
      return true;
    }
    return false;
  }

}
