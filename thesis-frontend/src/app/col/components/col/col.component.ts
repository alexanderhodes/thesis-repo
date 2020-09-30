import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ColService} from '../../services';
import {Col} from '../../interfaces';

@Component({
  selector: 'ts-col-col',
  templateUrl: './col.component.html',
  styleUrls: ['./col.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
  encapsulation: ViewEncapsulation.Emulated
})
export class ColComponent implements OnInit {

  cols: Col[];
  form: FormGroup = new FormGroup({
    id: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required)
  });

  constructor(private colService: ColService,
              private changeDetectorRef: ChangeDetectorRef) {
    this.cols = [];
  }

  ngOnInit(): void {
    this.loadCols();
  }

  createCol(): void {
    if (this.form.valid) {
      const col: Col = {
        id: this.form.get('id').value,
        name: this.form.get('name').value
      };
      this.colService.createCol(col).subscribe((createdCol) => {
        this.form.reset({ id: null, name: null });
        this.loadCols();
      }, (error) => {
        console.log('error creating col', error);
      });
    }
  }

  private loadCols(): void {
    this.colService.findAll().subscribe(cols => {
      this.cols = cols;
//      this.changeDetectorRef.detectChanges();
    }, (error) => {
      console.log('error getting cols', error);
    });
  }

}
