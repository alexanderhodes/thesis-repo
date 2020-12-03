import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../shared';
import {
  CreateResourceComponent,
  ResourceOverviewComponent,
  ResourceDetailComponent,
  ResourceListComponent
} from './components/public-api';
import {ResourcesRoutingModule} from './resources-routing.module';

const components = [
  CreateResourceComponent,
  ResourceOverviewComponent,
  ResourceDetailComponent,
  ResourceListComponent
];

@NgModule({
  declarations: [
    ...components
  ],
  exports: [],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    SharedModule,
    ResourcesRoutingModule
  ],
  providers: []
})
export class ResourcesModule {

}
