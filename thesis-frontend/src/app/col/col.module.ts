import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../shared';
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
    RouterModule,
    ReactiveFormsModule,
    SharedModule,
    ColRoutingModule
  ],
  providers: [
    ...services,
  ]
})
export class ColModule {

}
