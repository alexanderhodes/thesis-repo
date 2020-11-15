import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../shared';
import {ConfigurationComponent} from './components/public-api';
import {ConfigurationRoutingModule} from './configuration-routing.module';

const components = [
  ConfigurationComponent
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
    FormsModule,
    RouterModule,
    SharedModule,
    ConfigurationRoutingModule
  ],
  providers: [
    ...services
  ]
})
export class ConfigurationModule {

}
