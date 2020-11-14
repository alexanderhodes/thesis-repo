import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LoginRoutingModule} from './login-routing.module';
import {LoginComponent} from './login.component';
import {LoginApiService} from './login-api.service';
import {HttpClientModule} from '@angular/common/http';
import {SharedModule} from '../shared';

const components = [LoginComponent];
const services = [LoginApiService];

@NgModule({
  declarations: [
    ...components
  ],
  exports: [
    ...components
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    LoginRoutingModule,
    SharedModule
  ],
  providers: [
    ...services
  ]
})
export class LoginModule {

}

