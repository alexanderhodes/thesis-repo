import {ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ObjectApiService, ObjectStructureApiService} from '../../../core/http';
import {take} from 'rxjs/operators';
import {IObject, IObjectStructure} from '../../../shared/interfaces';

@Component({
  selector: 'ts-configuration',
  templateUrl: 'configuration.component.html',
  styleUrls: ['configuration.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfigurationComponent implements OnInit {

  constructor(private objectApiService: ObjectApiService,
              private objectStructureApiService: ObjectStructureApiService) {}

  ngOnInit(): void {
    this.objectApiService.getAllObjects()
      .pipe(take(1))
      .subscribe((objects: IObject[]) => {
        console.log('objects', objects);
      });

    this.objectStructureApiService.getAll()
      .pipe(take(1))
      .subscribe((objectStructures: IObjectStructure[]) => {
        console.log('objectStructures', objectStructures);
      });
  }

}
