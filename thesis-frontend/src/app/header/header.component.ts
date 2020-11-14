import {ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {StateService, STORAGE_USER} from '../shared';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'ts-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.Emulated
})
export class HeaderComponent implements OnInit {

  username$: Observable<string>;

  constructor(private stateService: StateService) {  }

  ngOnInit() {
    this.username$ = this.stateService.getItem$(STORAGE_USER).pipe(
      map(value => {
        console.log('header', value);
        if (value) {
          return value.username;
        }
        return null;
      })
    );
  }

  logout(): void {
    this.stateService.clear();
  }

}
