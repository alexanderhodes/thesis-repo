import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  OnInit, Output,
  ViewEncapsulation
} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {take, takeUntil} from 'rxjs/operators';
import {
  CleanUpHelper,
  ObjectApiService,
  ObjectStructureApiService,
  StateService,
  STORAGE_USER,
  TransactionsApiService
} from '../../../core';
import {Asset, IObject, IObjectStructure, KeyPair, StorageUser, Transaction, UuidService} from '../../../shared';

@Component({
  selector: 'ts-create-resource',
  templateUrl: 'create-resource.component.html',
  styleUrls: ['create-resource.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateResourceComponent extends CleanUpHelper implements OnInit {

  @Output()
  resourceCreated: EventEmitter<Asset>;

  createForm: FormGroup;
  selectedResourceType: string;
  objectStructures: IObjectStructure[] = [];
  resourceTypes: { key: string, description: string }[] = [];
  #publicKey: string;
  submitted: boolean = false;

  constructor(private transactionsApiService: TransactionsApiService,
              private objectStructureApiService: ObjectStructureApiService,
              private stateService: StateService,
              private objectApiService: ObjectApiService,
              private uuidService: UuidService,
              private changeDetectorRef: ChangeDetectorRef) {
    super();
    this.resourceCreated = new EventEmitter<Asset>();
  }

  ngOnInit(): void {
    // implement this
    this.stateService.getItem$(STORAGE_USER)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((data: StorageUser) => {
        this.#publicKey = data && data.publicKey ? data.publicKey : null;
      });

    this.resourceTypes = [{
      key: 'occupation',
      description: 'Beruf'
    }, {
      key: 'qualification',
      description: 'Qualifikation'
    }];

    this.objectApiService.getAllObjects()
      .pipe(take(1))
      .subscribe((objects: IObject[]) => {
        objects.forEach((object) => {
          const found = this.resourceTypes.find(objectType => objectType.key === object.name);
          if (!found) {
            this.resourceTypes.push({
              key: object.name,
              description: object.name
            });
          }
        });
        this.changeDetectorRef.detectChanges();
      }, () => {
        this.changeDetectorRef.detectChanges();
      });
  }

  createResource(): void {
    console.log('value', this.createForm.value);
    this.submitted = true;
    if (this.createForm.valid) {
      const asset: Asset = {
        namespace: this.selectedResourceType,
        data: this.createForm.value
      };
      asset.data.uuid = this.uuidService.generateV4Uuid();
      const privateKey = '8CDnuWXXDPRB8Zn8bd22U52qhLAfaU3NZZeYDrHZA14m';
      const keyPair: KeyPair = {
        privateKey,
        publicKey: this.#publicKey
      };
      this.transactionsApiService.createTransaction(asset, keyPair)
        .pipe(take(1))
        .subscribe((createdTransaction: Transaction) => {
          console.log('createdTransaction', createdTransaction);
          this.resourceCreated.emit(createdTransaction.asset.data);
          this.submitted = false;
          this.createForm.reset({});
          this.changeDetectorRef.detectChanges();
        }, (error) => {
          console.log('err', error);
        });
    }
  }

  selectResourceType(event): void {
    this.createForm = null;
    const value = event.target.value;
    const selectedResourceType = this.resourceTypes.find(type => type.description === value);
    console.log('selectedResourceType', selectedResourceType);
    if (selectedResourceType) {
      this.selectedResourceType = selectedResourceType.key;
      this.createForm = new FormGroup({});
      if (this.selectedResourceType === 'qualification' || this.selectedResourceType === 'occupation') {
        this.createForm.addControl('identifier', new FormControl('', [Validators.required]));
        this.createForm.addControl('name', new FormControl('', [Validators.required]));
        this.createForm.addControl('description', new FormControl('', [Validators.required]));
        this.createForm.addControl('disambiguatingDescription', new FormControl('', []));
        this.createForm.addControl('url', new FormControl('', [Validators.required]));
      } else {
        this.createForm.addControl('name', new FormControl('', [Validators.required]));
      }
      this.objectStructureApiService.getObjectStructuresByObject(this.selectedResourceType)
        .pipe(take(1))
        .subscribe((objectStructures: IObjectStructure[]) => {
          this.objectStructures = objectStructures;
          objectStructures.forEach((objectStructure: IObjectStructure) => {
            const validators = objectStructure.nullable ? [] : [Validators.required];
            const defaultValue = objectStructure.datatype === 'boolean' ? false : objectStructure.datatype === 'number' ? 0 : '';
            this.createForm.addControl(objectStructure.field, new FormControl(defaultValue, validators));
          });
          this.changeDetectorRef.markForCheck();
        }, () => {
          this.objectStructures = [];
          this.changeDetectorRef.markForCheck();
        });
    }
  }

  getFormControl(name: string): AbstractControl {
    return this.createForm.get(name);
  }
  //
  // createOccupation(): void {
  //   if (this.createOccupationForm.valid) {
  //     const occupation: Occupation = {
  //       namespace: 'occupation',
  //       data: {
  //         name: '',
  //         url: null,
  //         status: this.status,
  //         skills: this.skills,
  //         occupationalCategory: '',
  //         narrowerOccupations: this.narrowerOccupations,
  //         hierarchy: this.hierarchy,
  //         disambiguatingDescription: '',
  //         description: '',
  //         identifier: ''
  //       }
  //     };
  //     const keyPair: KeyPair = { publicKey: '', privateKey: '' };
  //     this.transactionsApiService.createTransaction(occupation, keyPair)
  //       .pipe(take(1))
  //       .subscribe((transaction: Transaction) => {
  //         console.log('response', transaction);
  //       }, (error) => {
  //         console.log('error', error);
  //       });
  //   }
  // }

}
