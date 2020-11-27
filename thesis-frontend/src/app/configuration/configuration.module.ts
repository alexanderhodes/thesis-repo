import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../shared';
import {
  AddObjectStructureComponent,
  ConfigurationComponent,
  CreateObjectComponent,
  UpdateObjectComponent,
  ObjectListComponent,
  ObjectStructureListComponent
} from './components/public-api';
import {ConfigurationRoutingModule} from './configuration-routing.module';
import {CoreModule} from '../core';

const components = [
  AddObjectStructureComponent,
  ConfigurationComponent,
  CreateObjectComponent,
  UpdateObjectComponent,
  ObjectListComponent,
  ObjectStructureListComponent
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
    ReactiveFormsModule,
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
