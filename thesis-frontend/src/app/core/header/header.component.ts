import {ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Router} from '@angular/router';
import {StateService, STORAGE_USER} from '../services';

@Component({
  selector: 'ts-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.Emulated
})
export class HeaderComponent implements OnInit {

  username$: Observable<string>;

  constructor(private stateService: StateService,
              private router: Router) {  }

  ngOnInit() {
    this.username$ = this.stateService.getItem$(STORAGE_USER).pipe(
      map(value => {
        if (value) {
          return value.username;
        }
        return null;
      })
    );
  }

  logout(): void {
    this.stateService.clear();
    this.router.navigate(['/login']).then();
  }

}
