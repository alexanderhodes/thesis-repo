import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../shared';
import {
  CreateResourceComponent,
  ResourceDetailComponent,
  ResourceDetailCreateRelationComponent,
  ResourceDetailRemotesComponent,
  ResourceDetailTransactionsComponent,
  ResourceListComponent,
  ResourceOverviewComponent
} from './components/public-api';
import {ResourcesRoutingModule} from './resources-routing.module';
import {CoreModule} from '../core';

const components = [
  CreateResourceComponent,
  ResourceDetailComponent,
  ResourceDetailCreateRelationComponent,
  ResourceDetailRemotesComponent,
  ResourceDetailTransactionsComponent,
  ResourceOverviewComponent,
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
    ResourcesRoutingModule,
    CoreModule
  ],
  providers: []
})
export class ResourcesModule {

}
