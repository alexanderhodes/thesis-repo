import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {RequestInterceptor, SharedModule} from '../shared';
import {ColService} from './services';
import {ColComponent} from './components';
import {ColRoutingModule} from './col-routing.module';

const components = [
  ColComponent
];
const services = [
  ColService
];

@NgModule({
  declarations: [
    ...components
  ],
  exports: [
    ...components
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    ReactiveFormsModule,
    SharedModule,
    ColRoutingModule
  ],
  providers: [
    ...services,
    { provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true }
  ]
})
export class ColModule {

}
