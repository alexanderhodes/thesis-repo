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
import {DbRelationStructure} from '../../../shared';

@Component({
  selector: 'ts-add-relation-structure',
  templateUrl: 'add-relation-structure.component.html',
  styleUrls: ['add-relation-structure.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddRelationStructureComponent {

  @Input()
  relationStructures: DbRelationStructure[];
  @Output()
  addedRelationStructure: EventEmitter<DbRelationStructure>;

  addRelationStructureForm: FormGroup = new FormGroup({
    field: new FormControl('', [Validators.required]),
  });

  constructor(private changeDetectorRef: ChangeDetectorRef) {
    this.relationStructures = [];
    this.addedRelationStructure = new EventEmitter<DbRelationStructure>();
  }

  addRelationStructure(): void {
    console.log('addRelationStructure', !this._hasFieldInRelationStructure(), this.addRelationStructureForm.valid);
    if (!this._hasFieldInRelationStructure() && this.addRelationStructureForm.valid) {
      const relationStructure: DbRelationStructure = {
        field: this.getFormControl('field').value
      };
      this.addedRelationStructure.emit(relationStructure);
      this._clearRelationStructureForm();
    }
  }

  getFormControl(key: string): AbstractControl {
    return this.addRelationStructureForm.get(key);
  }

  private _clearRelationStructureForm(): void {
    this.addRelationStructureForm.reset({});
    this.changeDetectorRef.detectChanges();
  }

  private _hasFieldInRelationStructure(): boolean {
    const fieldControl = this.getFormControl('field');
    const foundRelationStructure = this.relationStructures.find(relationStructure => relationStructure.field === fieldControl.value);
    if (foundRelationStructure) {
      fieldControl.setErrors({
        fieldNameExisting: true
      });
      return true;
    }
    return false;
  }

}
