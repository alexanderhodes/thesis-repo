import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {take, takeUntil} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {
  CleanUpHelper,
  GraphApiService,
  ObjectApiService,
  StateService,
  STORAGE_USER,
  TransactionsApiService
} from '../../../core';
import {Asset, GraphObject, IObject, KeyPair, Node, Status, StorageUser} from '../../../shared';

export interface ILocalResource {
  type: string;
  data: Asset[];
  custom: boolean;
}

@Component({
  selector: 'ts-resource-list',
  templateUrl: 'resource-list.component.html',
  styleUrls: ['resource-list.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResourceListComponent extends CleanUpHelper implements OnInit {

  @Input()
  resourceCreated$: Observable<Asset>;
  resources: ILocalResource[];
  #keyPair: KeyPair;

  constructor(private objectApiService: ObjectApiService,
              private graphApiService: GraphApiService,
              private router: Router,
              private transactionApiService: TransactionsApiService,
              private stateService: StateService,
              private changeDetectorRef: ChangeDetectorRef) {
    super();
  }

  ngOnInit(): void {
    this.stateService.getItem$(STORAGE_USER)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((data: StorageUser) => {
        this.#keyPair = {
          privateKey: data && data.privateKey ? data.privateKey : null,
          publicKey: data && data.publicKey ? data.publicKey : null
        };
      });

    this.resources = [{type: 'occupation', data: [], custom: false}, {type: 'qualification', data: [], custom: false}];

    this.objectApiService.getAllObjects()
      .pipe(take(1))
      .subscribe((objects: IObject[]) => {
        objects.forEach((object) => {
          const found = this.resources.find(objectType => objectType.type === object.name);
          if (!found) {
            this.resources.push({type: object.name, data: [], custom: true});
          }
        });
        this._loadResources();
        this.changeDetectorRef.detectChanges();
      }, () => {
        this._loadResources();
        this.changeDetectorRef.detectChanges();
      });

    this.resourceCreated$.pipe(takeUntil(this.onDestroy$))
      .subscribe((resourceCreated: Asset) => {
        const resource = this.resources.find(r => r.type === resourceCreated.namespace);
        if (resource) {
          resource.data.push(resourceCreated);
        }
        this.changeDetectorRef.detectChanges();
      });
  }

  private _loadResources(): void {
    this.resources.forEach(object => {
      this.graphApiService.getResourcesByType(object.type)
        .pipe(take(1))
        .subscribe((graphObjects: GraphObject[]) => {
          console.log('response', graphObjects);
          object.data = graphObjects.map(graphObject => {
            const node = (graphObject.data as Node);
            const data = {
              name: node.name,
              identifier: node.properties.identifier,
              uuid: node.properties.uuid,
              status: node.properties.status
            };
            Object.keys(node.properties).forEach(key => {
              data[key] = node.properties[key];
            });
            return {
              namespace: object.type,
              data
            };
          });
          console.log('object', object);
          this.changeDetectorRef.detectChanges();
        }, (error) => {
          console.log('error', error);
          this.changeDetectorRef.detectChanges();
        });
    });
  }

  changeStatus(localResource: ILocalResource, updatedAsset: Asset, newStatus: Status): void {
    updatedAsset.data.status = newStatus;
    this.transactionApiService.createTransaction(updatedAsset, this.#keyPair, 'update').pipe(take(1))
      .subscribe((updatedTransaction) => {
        console.log('updatedTransaction', updatedTransaction);
        const resource = this.resources.find(res => res.type === localResource.type);
        if (resource) {
          const index = resource.data.findIndex(asset => asset.data.uuid === updatedAsset.data.uuid);
          if (index > -1) {
            resource.data[index].data.status = newStatus;
            this.changeDetectorRef.detectChanges();
          }
        }
      }, (error) => {
        console.log('error', error);
      });
  }

}
