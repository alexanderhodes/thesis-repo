import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LoginRoutingModule} from './login-routing.module';
import {LoginComponent, ValidatePrivateKeyComponent} from './components/public-api';
import {SharedModule} from '../shared';
import {CoreModule} from '../core';

const components = [
  LoginComponent,
  ValidatePrivateKeyComponent
];
const services = [];

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
    LoginRoutingModule,
    SharedModule,
    CoreModule
  ],
  providers: [
    ...services
  ]
})
export class LoginModule {

}

