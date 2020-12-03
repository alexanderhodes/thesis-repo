import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {take} from 'rxjs/operators';
import {ObjectApiService} from '../../../core/http';
import {IObject} from '../../../shared/interfaces';

@Component({
  selector: 'ts-objects',
  templateUrl: 'object-list.component.html',
  styleUrls: ['object-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.Emulated
})
export class ObjectListComponent implements OnInit {

  objects: IObject[];
  show: boolean = false;

  constructor(private objectApiService: ObjectApiService,
              private changeDetectorRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.objectApiService.getAllObjects()
      .pipe(take(1))
      .subscribe((objects: IObject[]) => {
        this.objects = objects;
        this.changeDetectorRef.detectChanges();
      }, () => {
        this.objects = [];
      });
  }

  toggle(): void {
    this.show = !this.show;
  }

  onObjectCreated(createdObject: IObject): void {
    this.objects.push(createdObject);
  }

  deleteObject(deletableObject: IObject): void {
    this.objectApiService.deleteObject(deletableObject.name)
      .pipe(take(1))
      .subscribe((success) => {
        console.log(`object with name ${deletableObject.name} deleted`, success);
        const index = this.objects.findIndex(object => object.name === deletableObject.name);
        if (index >= -1) {
          this.objects.splice(index, 1);
          this.changeDetectorRef.detectChanges();
        }
      });
  }

}
