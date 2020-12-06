import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {take} from 'rxjs/operators';
import {GraphApiService, ObjectApiService} from '../../../core';
import {Asset, GraphObject, IObject, Node} from '../../../shared';

@Component({
  selector: 'ts-resource-list',
  templateUrl: 'resource-list.component.html',
  styleUrls: ['resource-list.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResourceListComponent implements OnInit {

  objects: { type: string, data: Asset[], custom: boolean }[];

  constructor(private objectApiService: ObjectApiService,
              private graphApiService: GraphApiService,
              private router: Router,
              private changeDetectorRef: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.objects = [{type: 'occupation', data: [], custom: false }, {type: 'qualification', data: [], custom: false }];

    this.objectApiService.getAllObjects()
      .pipe(take(1))
      .subscribe((objects: IObject[]) => {
        objects.forEach((object) => {
          const found = this.objects.find(objectType => objectType.type === object.name);
          if (!found) {
            this.objects.push({type: object.name, data: [], custom: true});
          }
        });
        this._loadResources();
        this.changeDetectorRef.detectChanges();
      }, () => {
        this._loadResources();
        this.changeDetectorRef.detectChanges();
      });
  }

  private _loadResources(): void {
    this.objects.forEach(object => {
      this.graphApiService.getResourcesByType(object.type)
        .pipe(take(1))
        .subscribe((graphObjects: GraphObject[]) => {
          console.log('response', graphObjects);
          object.data = graphObjects.map(graphObject => {
            const node = (graphObject.data as Node);
            const data = {
              name: node.name,
              uuid: node.properties.uuid
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

}
