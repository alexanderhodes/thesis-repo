import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {take} from 'rxjs/operators';
import {ObjectStructureApiService, TransactionsApiService} from '../../../core/http';
import {Hierarchy, KeyPair, Occupation, Qualification, Status, Transaction} from '../../../shared/interfaces';

@Component({
  selector: 'ts-create-occupation',
  templateUrl: 'create-occupation.component.html',
  styleUrls: ['create-occupation.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateOccupationComponent implements OnInit {

  createOccupationForm: FormGroup = new FormGroup({
    identifier: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    disambiguatingDescription: new FormControl('', [Validators.required]),
    occupationalCategory: new FormControl('', [Validators.required])
  });
  hierarchy: Hierarchy[];
  narrowerOccupations: Occupation[];
  status: Status;
  skills: Qualification[];

  constructor(private transactionsApiService: TransactionsApiService,
              private objectStructureApiService: ObjectStructureApiService,
              private changeDetectorRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    // implement this
  }

  createOccupation(): void {
    if (this.createOccupationForm.valid) {
      const occupation: Occupation = {
        namespace: 'occupation',
        data: {
          name: '',
          url: null,
          status: this.status,
          skills: this.skills,
          occupationalCategory: '',
          narrowerOccupations: this.narrowerOccupations,
          hierarchy: this.hierarchy,
          disambiguatingDescription: '',
          description: '',
          identifier: ''
        }
      };
      const keyPair: KeyPair = { publicKey: '', privateKey: '' };
      this.transactionsApiService.createTransaction(occupation, keyPair)
        .pipe(take(1))
        .subscribe((transaction: Transaction) => {
          console.log('response', transaction);
        }, (error) => {
          console.log('error', error);
        });
    }
  }

  getFormControl(name: string): AbstractControl {
    return this.createOccupationForm.get(name);
  }

}
