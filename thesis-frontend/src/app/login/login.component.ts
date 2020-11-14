import {ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewEncapsulation} from '@angular/core';
import {LoginApiService} from './login-api.service';
import {LoginCredentials} from './login.interface';
import {take} from 'rxjs/operators';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'ts-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {

  loginForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });
  loginError: string;
  submitted: boolean = false;

  constructor(private loginApiService: LoginApiService,
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
        .subscribe((response) => {
          // ToDo: redirect to start page
        }, (error) => {
          console.log('error', error);
          if (error.status && error.status === 401) {
            this.loginError = 'Der Benutzername oder das Passwort ist ungültig.';
          } else {
            this.loginError = 'Es besteht derzeit keine Internet-Verbindung. Bitte versuchen Sie es erneut.';
          }
          this.changeDetectorRef.detectChanges();
        });
    }
  }

  getFormControl(key: string): AbstractControl {
    return this.loginForm.get(key);
  }

}
