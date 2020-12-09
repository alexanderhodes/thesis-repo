import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {take} from 'rxjs/operators';
import {GraphApiService} from '../../../core';
import {Asset, GraphObject, GraphQuery, GraphRelationQuery, Node, RemoteResponse} from '../../../shared';

@Component({
  selector: 'ts-resource-detail',
  templateUrl: 'resource-detail.component.html',
  styleUrls: ['resource-detail.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResourceDetailComponent implements OnInit {

  asset: Asset;
  custom: boolean = false;
  remoteResponses: Array<RemoteResponse<GraphObject[]>>;

  constructor(private graphApiService: GraphApiService,
              private activatedRoute: ActivatedRoute,
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
            uuid: node.properties.uuid
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

    this.graphApiService.getRemoteNodesByQuery(nodeParam, query)
      .pipe(take(1))
      .subscribe((remoteResponses: Array<RemoteResponse<GraphObject[]>>) => {
        console.log('remoteResponse', remoteResponses);
        this.remoteResponses = remoteResponses;
        this.changeDetectorRef.detectChanges();
      });
  }

}
