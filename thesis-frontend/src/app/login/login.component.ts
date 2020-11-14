import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';
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

  constructor(private loginApiService: LoginApiService) {}

  login(): void {
    if (this.loginForm.valid) {
      const loginCredentials: LoginCredentials = {
        username: '',
        password: ''
      };

      this.loginApiService.login(loginCredentials)
        .pipe(take(1))
        .subscribe((response) => {
          // ToDo: store token in localStorage
        }, (error) => {
          // ToDo: handle error
        });
    }
  }

  getFormControl(key: string): AbstractControl {
    return this.loginForm.get(key);
  }

}
