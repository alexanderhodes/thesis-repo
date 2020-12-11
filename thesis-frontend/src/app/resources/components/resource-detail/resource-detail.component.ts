import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AsyncPipe} from '@angular/common';
import {take} from 'rxjs/operators';
import {TranslateService} from '@ngx-translate/core';
import {BreadcrumbService, GraphApiService, TransactionsApiService} from '../../../core';
import {
  Asset,
  AssetTransaction,
  GraphObject,
  GraphQuery,
  GraphRelationQuery, GraphRelationsResponse,
  Node,
  RemoteResponse
} from '../../../shared';

@Component({
  selector: 'ts-resource-detail',
  templateUrl: 'resource-detail.component.html',
  styleUrls: ['resource-detail.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    AsyncPipe
  ]
})
export class ResourceDetailComponent implements OnInit, OnDestroy {

  asset: Asset;
  custom: boolean = false;
  remoteResponses: Array<RemoteResponse<GraphObject[]>>;
  transactions: AssetTransaction[];
  relations: GraphRelationsResponse[];
  #node: string;
  #uuid: string;
  #graphQuery: GraphQuery;

  constructor(private graphApiService: GraphApiService,
              private transactionsApiService: TransactionsApiService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private breadcrumbService: BreadcrumbService,
              private asyncPipe: AsyncPipe,
              private translateService: TranslateService,
              private changeDetectorRef: ChangeDetectorRef) {
    this.remoteResponses = [];
  }

  ngOnInit(): void {
    this.#node = this.activatedRoute.snapshot.params.node;
    this.#uuid = this.activatedRoute.snapshot.params.uuid;
    this.custom = this.activatedRoute.snapshot.queryParamMap.has('custom') ?
      !this.activatedRoute.snapshot.queryParamMap.get('custom') : true;

    this.#graphQuery = {node: this.#node, condition: {uuid: this.#uuid}};

    // get node data
    this._getNode();
    // get names on different nodes
    this._getRemoteNodes();
    // get blockchain transactions
    this._getTransactions();
    // get relations
    this._getRelations();

    this.breadcrumbService.newBreadcrumb({
      text: this.asyncPipe.transform(this.translateService.get(`common.${this.#node}-single`)),
      url: this.router.url
    });
  }

  ngOnDestroy(): void {
    this.breadcrumbService.removeLastBreadcrumb();
  }

  onReloadRemoteResponses(): void {
    this._getRemoteNodes();
  }

  onReloadTransactions(): void {
    this._getTransactions();
  }

  onReloadRelations(): void {
    this._getRelations();
  }

  private _getNode(): void {
    this.graphApiService.getNodesByQuery(this.#node, this.#graphQuery)
      .pipe(take(1))
      .subscribe((graphObjects: GraphObject[]) => {
        if (graphObjects && graphObjects.length > 0) {
          const node = (graphObjects[0].data as Node);
          const data = {
            name: node.properties.name,
            uuid: node.properties.uuid,
            status: node.properties.status
          };
          Object.keys(node.properties).forEach(key => {
            data[key] = node.properties[key];
          });
          this.asset = {
            namespace: node.name,
            data
          };
          console.log('asset', this.asset);
          this.changeDetectorRef.detectChanges();
        }
      }, (error) => {
        console.log('error', error);
      });
  }

  private _getRemoteNodes(): void {
    this.graphApiService.getRemoteNodesByQuery(this.#node, this.#graphQuery)
      .pipe(take(1))
      .subscribe((remoteResponses: Array<RemoteResponse<GraphObject[]>>) => {
        this.remoteResponses = remoteResponses;
        this.changeDetectorRef.detectChanges();
      });
  }

  private _getTransactions(): void {
    this.transactionsApiService.getTransactionsForAsset(this.#node, this.#uuid)
      .pipe(take(1))
      .subscribe((transactions: AssetTransaction[]) => {
        this.transactions = transactions;
        this.changeDetectorRef.detectChanges();
      });
  }

  private _getRelations(): void {
    const relationsQuery: GraphRelationQuery = {
      left: {
        namespace: this.#node,
        condition: {
          uuid: this.#uuid
        }
      },
      direction: 'both'
    };
    this.graphApiService.getRelationsByQuery(relationsQuery)
      .pipe(take(1))
      .subscribe((relations: GraphRelationsResponse[]) => {
        this.relations = relations;
        this.changeDetectorRef.detectChanges();
      });
  }

}
