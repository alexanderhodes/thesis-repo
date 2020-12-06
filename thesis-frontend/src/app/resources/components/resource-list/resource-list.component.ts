import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewEncapsulation} from '@angular/core';
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

  objects: { type: string, data: Asset[] }[];

  constructor(private objectApiService: ObjectApiService,
              private graphApiService: GraphApiService,
              private changeDetectorRef: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.objects = [{type: 'occupation', data: []}, {type: 'qualification', data: []}];

    this.objectApiService.getAllObjects()
      .pipe(take(1))
      .subscribe((objects: IObject[]) => {
        objects.forEach((object) => {
          const found = this.objects.find(objectType => objectType.type === object.name);
          if (!found) {
            this.objects.push({type: object.name, data: []});
          }
        });
        this._loadResources();
        this.changeDetectorRef.detectChanges();
      }, () => {
        this._loadResources();
        this.changeDetectorRef.detectChanges();
      });
  }

  getPropertyKeys(object: { type: string, data: Asset[] }): string[] {
    const keys = [];
    if (object.data && object.data.length > 0) {
      Object.keys(object.data[0].data).forEach(key => keys.push(key));
    }
    console.log('keys', keys);
    return keys;
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
              name: node.name
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
