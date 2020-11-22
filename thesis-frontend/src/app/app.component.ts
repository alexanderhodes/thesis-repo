import {Component, OnInit} from '@angular/core';
import {takeUntil} from 'rxjs/operators';
import {StateService, STORAGE_USER} from './core/services';
import {CleanUpHelper} from './core/utils';
import {LoginApiService} from './core/http';

@Component({
  selector: 'ts-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent extends CleanUpHelper implements OnInit {
  title = 'thesis-frontend';

  constructor(private stateService: StateService,
              private loginApiService: LoginApiService) {
    super();
  }

  ngOnInit(): void {
    this.stateService.getItem$(STORAGE_USER)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((user) => {
        // check if user is already logged in
        if (Object.entries(user).length === 0) {
          // user is not logged in, so silent login is done
          this.loginApiService.loginSilent()
            .subscribe((response) => {
              console.log('silent-login', response);
            });
        }
      });
  }
}
