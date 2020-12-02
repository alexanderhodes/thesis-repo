import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {GraphApiService} from '../../../core/http';
import {Asset, GraphObject, GraphQuery, Node} from '../../../shared/interfaces';
import {take} from 'rxjs/operators';

@Component({
  selector: 'ts-resource-detail',
  templateUrl: 'resource-detail.component.html',
  styleUrls: ['resource-detail.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResourceDetailComponent implements OnInit {

  asset: Asset;

  constructor(private graphApiService: GraphApiService,
              private activatedRoute: ActivatedRoute,
              private changeDetectorRef: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    console.log('params', this.activatedRoute.snapshot.params);
    const nodeParam = this.activatedRoute.snapshot.params.node;
    const nameParam = this.activatedRoute.snapshot.params.name;

    const query: GraphQuery = {node: nodeParam, condition: {name: nameParam}};

    this.graphApiService.getNodesByQuery(nodeParam, query)
      .pipe(take(1))
      .subscribe((graphObjects: GraphObject[]) => {
        if (graphObjects && graphObjects.length > 0) {
          const node = (graphObjects[0].data as Node);
          const data = {
            name: node.name
          };
          Object.keys(node.properties).forEach(key => {
            data[key] = node.properties[key];
          });
          this.asset = {
            namespace: graphObjects[0].type,
            data
          };
          console.log('asset', this.asset);
          this.changeDetectorRef.detectChanges();
        }
      }, (error) => {
        console.log('error', error);
      });
  }

}
