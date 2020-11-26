import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../shared';
import {
  ConfigurationComponent,
  CreateObjectComponent,
  ObjectDetailComponent,
  ObjectsComponent
} from './components/public-api';
import {ConfigurationRoutingModule} from './configuration-routing.module';
import {CoreModule} from '../core';

const components = [
  ConfigurationComponent,
  CreateObjectComponent,
  ObjectDetailComponent,
  ObjectsComponent
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
    CoreModule,
    ConfigurationRoutingModule
  ],
  providers: [
    ...services
  ]
})
export class ConfigurationModule {

}
