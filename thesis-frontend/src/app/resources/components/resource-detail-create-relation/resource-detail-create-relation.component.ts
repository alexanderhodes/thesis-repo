import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component, EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation
} from '@angular/core';
import {AsyncPipe} from '@angular/common';
import {TranslateService} from '@ngx-translate/core';
import {take, takeUntil} from 'rxjs/operators';
import {
  CleanUpHelper,
  DbRelationApiService,
  DbRelationStructureApiService,
  GraphApiService,
  ObjectApiService, StateService, STORAGE_USER,
  TransactionsApiService
} from '../../../core';
import {
  Asset,
  DbRelation,
  GraphObject,
  IMessage,
  IObject,
  IResourceType,
  KeyPair,
  Node, Relation,
  StorageUser,
  Transaction, UuidService
} from '../../../shared';

@Component({
  selector: 'ts-resource-detail-create-relation',
  templateUrl: 'resource-detail-create-relation.component.html',
  styleUrls: ['resource-detail-create-relation.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    AsyncPipe
  ]
})
export class ResourceDetailCreateRelationComponent extends CleanUpHelper implements OnInit {

  @Input()
  asset!: Asset;
  @Output()
  relationCreated: EventEmitter<void>;

  relations: DbRelation[];
  selectedRelation: DbRelation;
  resourceTypes: IResourceType[] = [];
  selectedResourceType: IResourceType;
  message: IMessage;
  nodes: GraphObject[];
  selectedGraphObject: GraphObject;
  #keyPair: KeyPair;

  constructor(private relationApiService: DbRelationApiService,
              private relationStructureApiService: DbRelationStructureApiService,
              private transactionsApiService: TransactionsApiService,
              private objectApiService: ObjectApiService,
              private graphApiService: GraphApiService,
              private stateService: StateService,
              private uuidService: UuidService,
              private translateService: TranslateService,
              private asyncPipe: AsyncPipe,
              private changeDetectorRef: ChangeDetectorRef) {
    super();
    this.relationCreated = new EventEmitter<void>();
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

    this.relationApiService.findAll()
      .pipe(take(1)).subscribe((relations: DbRelation[]) => {
      this.relations = relations;
      this.changeDetectorRef.detectChanges();
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

  selectRelation(event): void {
    const relationName = event.target.value;
    this.selectedRelation = relationName ? this.relations.find(relation => relation.name === relationName) : null;
  }

  selectResourceType(event): void {
    const resourceTypeDescription = event.target.value;
    this.selectedResourceType = resourceTypeDescription ?
      this.resourceTypes.find(resourceType => resourceType.description === resourceTypeDescription) : null;
    this.getNodesForResourceType();
  }

  selectGraphObject(event): void {
    const graphObjectName = event.target.value;
    this.selectedGraphObject = graphObjectName ?
      this.nodes.find(graphObject => (graphObject.data as Node).properties.name === graphObjectName) : null;
  }

  createRelation(): void {
    if (this.selectedRelation && this.selectedResourceType && this.selectedGraphObject) {
      const node: Node = this.selectedGraphObject.data as Node;
      const relation: Relation = {
        namespace: 'relation',
        data: {
          uuid: this.uuidService.generateV4Uuid(),
          attributes: {},
          direction: 'out',
          name: this.selectedRelation.name,
          left: {
            namespace: this.asset.namespace,
            condition: {
              uuid: this.asset.data.uuid
            }
          },
          right: {
            namespace: node.name,
            condition: {
              uuid: node.properties.uuid
            }
          },
          status: 'released'
        }
      };

      this.transactionsApiService.createTransaction(relation, this.#keyPair, 'create').pipe(take(1))
        .subscribe((createdTransaction: Transaction) => {
          console.log('createdTransaction', createdTransaction);
          this.message = {
            type: 'success',
            text: this.asyncPipe.transform(this.translateService.get('common.success.relation-created'))
          };
          this.relationCreated.emit();
          this.changeDetectorRef.detectChanges();
        }, (error) => {
          const translation = error && error.status ? 'common.error.no-internet-connection' : 'common.error.saving-error';
          this.message = {
            type: 'error',
            text: this.asyncPipe.transform(this.translateService.get(translation))
          };
          this.changeDetectorRef.detectChanges();
        });
    } else {
      const translation = !this.selectedRelation ? 'common.error.relation-missing' :
        (!this.selectedResourceType ? 'common.error.no-resource-type' : 'common.error.no-object');
      this.message = {
        type: 'error',
        text: this.asyncPipe.transform(this.translateService.get(translation))
      };
      this.changeDetectorRef.detectChanges();
    }
  }

  private getNodesForResourceType(): void {
    this.graphApiService.getResourcesByType(this.selectedResourceType.key)
      .pipe(take(1))
      .subscribe((graphObjects: GraphObject[]) => {
        console.log('response', graphObjects);
        this.nodes = graphObjects;
        this.changeDetectorRef.detectChanges();
      }, (error) => {
        console.log('error', error);
        this.changeDetectorRef.detectChanges();
      });
  }

}
