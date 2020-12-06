import {ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewEncapsulation} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AsyncPipe} from '@angular/common';
import {take} from 'rxjs/operators';
import {TranslateService} from '@ngx-translate/core';
import {LoginApiService} from '../core';
import {LoginCredentials} from '../shared';

@Component({
  selector: 'ts-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    AsyncPipe
  ]
})
export class LoginComponent {

  loginForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });
  loginError: string;
  submitted: boolean = false;

  constructor(private loginApiService: LoginApiService,
              private router: Router,
              private asyncPipe: AsyncPipe,
              private translateService: TranslateService,
              private changeDetectorRef: ChangeDetectorRef) {
  }

  login(): void {
    this.loginError = null;
    this.submitted = true;
    if (this.loginForm.valid) {
      const loginCredentials: LoginCredentials = {
        username: this.getFormControl('username').value,
        password: this.getFormControl('password').value
      };

      this.loginApiService.login(loginCredentials)
        .pipe(take(1))
        .subscribe(() => {
          this.router.navigate(['/']).then();
        }, (error) => {
          console.log('error', error);
          if (error.status && error.status === 401) {
            this.loginError = this.asyncPipe.transform(this.translateService.get('common.error.username-password-invalid'));
          } else {
            this.loginError = this.asyncPipe.transform(this.translateService.get('common.error.no-internet-connection'));
          }
          this.changeDetectorRef.detectChanges();
        });
    }
  }

  getFormControl(key: string): AbstractControl {
    return this.loginForm.get(key);
  }

}
