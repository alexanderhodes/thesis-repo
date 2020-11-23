import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ObjectApiService, ObjectStructureApiService} from '../../../core/http';
import {take} from 'rxjs/operators';
import {IObject, IObjectStructure} from '../../../shared/interfaces';

@Component({
  selector: 'ts-object-detail',
  templateUrl: 'object-detail.component.html',
  styleUrls: ['object-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.Emulated
})
export class ObjectDetailComponent implements OnInit {

  object: IObject;
  objectStructure: IObjectStructure[];

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private objectApiService: ObjectApiService,
              private objectStructureApiService: ObjectStructureApiService,
              private changeDetectorRef: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      const name = params.get('name');
      this.objectApiService.getObjectByName(name).pipe(
        take(1)
      ).subscribe((object: IObject) => {
        this.object = object;
        this.changeDetectorRef.detectChanges();
      });
      this.objectStructureApiService.getObjectStructuresByObject(name).pipe(
        take(1)
      ).subscribe((objectStructure: IObjectStructure[]) => {
        this.objectStructure = objectStructure;
        this.changeDetectorRef.detectChanges();
      });
    });
  }

}
