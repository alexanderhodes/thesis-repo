import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewEncapsulation
} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {AsyncPipe} from '@angular/common';
import {TranslateService} from '@ngx-translate/core';
import {take, takeUntil} from 'rxjs/operators';
import {
  CleanUpHelper,
  ObjectApiService,
  ObjectStructureApiService,
  StateService,
  STORAGE_USER,
  TransactionsApiService
} from '../../../core';
import {
  Asset,
  IMessage,
  IObject,
  IObjectStructure,
  KeyPair,
  StorageUser,
  Transaction,
  UuidService
} from '../../../shared';

@Component({
  selector: 'ts-create-resource',
  templateUrl: 'create-resource.component.html',
  styleUrls: ['create-resource.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    AsyncPipe
  ]
})
export class CreateResourceComponent extends CleanUpHelper implements OnInit {

  @Output()
  resourceCreated: EventEmitter<Asset>;

  createForm: FormGroup;
  selectedResourceType: string;
  objectStructures: IObjectStructure[] = [];
  resourceTypes: { key: string, description: string }[] = [];
  #keyPair: KeyPair;
  submitted: boolean = false;
  message: IMessage;

  constructor(private transactionsApiService: TransactionsApiService,
              private objectStructureApiService: ObjectStructureApiService,
              private stateService: StateService,
              private objectApiService: ObjectApiService,
              private uuidService: UuidService,
              private asyncPipe: AsyncPipe,
              private translateService: TranslateService,
              private changeDetectorRef: ChangeDetectorRef) {
    super();
    this.resourceCreated = new EventEmitter<Asset>();
  }

  ngOnInit(): void {
    // implement this
    this.stateService.getItem$(STORAGE_USER)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((data: StorageUser) => {
        this.#keyPair = {
          privateKey: data && data.privateKey ? data.privateKey : null,
          publicKey: data && data.publicKey ? data.publicKey : null
        };
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
    this.message = null;
    if (this.createForm.valid) {
      const asset: Asset = {
        namespace: this.selectedResourceType,
        data: this.createForm.value
      };
      asset.data.uuid = this.uuidService.generateV4Uuid();
      this.transactionsApiService.createTransaction(asset, this.#keyPair)
        .pipe(take(1))
        .subscribe((createdTransaction: Transaction) => {
          console.log('createdTransaction', createdTransaction);
          this.resourceCreated.emit(createdTransaction.asset.data);
          this.submitted = false;
          this.message = {
            type: 'success',
            text: this.asyncPipe.transform(this.translateService.get('resources.text.created'))
          };
          this.createForm.reset({});
          this.changeDetectorRef.detectChanges();
        }, (error) => {
          console.log('err', error);
          this.message = {
            type: 'error',
            text: this.asyncPipe.transform(this.translateService.get('resources.text.create-error'))
          };
          this.changeDetectorRef.detectChanges();
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

}
