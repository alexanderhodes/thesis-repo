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
  GraphRelationQuery,
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
    const nodeParam = this.activatedRoute.snapshot.params.node;
    const uuidParam = this.activatedRoute.snapshot.params.uuid;
    this.custom = this.activatedRoute.snapshot.queryParamMap.has('custom') ?
      !this.activatedRoute.snapshot.queryParamMap.get('custom') : true;

    const query: GraphQuery = {node: nodeParam, condition: {uuid: uuidParam}};

    this.graphApiService.getNodesByQuery(nodeParam, query)
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

    const relationsQuery: GraphRelationQuery = {
      left: {
        namespace: nodeParam,
        condition: {
          name: uuidParam
        }
      },
      direction: 'both'
    };
    this.graphApiService.getRelationsByQuery(relationsQuery)
      .pipe(take(1))
      .subscribe((graphObjects: GraphObject[]) => {
        console.log('graphObjects', graphObjects);
      });

    this._getRemoteNodes(nodeParam, query);

    this._getTransactions(nodeParam, uuidParam);

    this.breadcrumbService.newBreadcrumb({
      text: this.asyncPipe.transform(this.translateService.get(`common.${nodeParam}-single`)),
      url: this.router.url
    });
  }

  private _getRemoteNodes(nodeParam: string, query: GraphQuery): void {
    this.graphApiService.getRemoteNodesByQuery(nodeParam, query)
      .pipe(take(1))
      .subscribe((remoteResponses: Array<RemoteResponse<GraphObject[]>>) => {
        console.log('remoteResponse', remoteResponses);
        this.remoteResponses = remoteResponses;
        this.changeDetectorRef.detectChanges();
      });
  }

  private _getTransactions(nodeParam: string, uuidParam: string): void {
    console.log('getTransactions');
    this.transactionsApiService.getTransactionsForAsset(nodeParam, uuidParam)
      .pipe(take(1))
      .subscribe((transactions: AssetTransaction[]) => {
        console.log('transactions', transactions);
        this.transactions = transactions;
        this.changeDetectorRef.detectChanges();
      });
  }

  ngOnDestroy(): void {
    this.breadcrumbService.removeLastBreadcrumb();
  }

}
