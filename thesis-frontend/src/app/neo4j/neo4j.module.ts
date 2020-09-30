import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {Neo4jComponent} from './components';
import {Neo4jRoutingModule} from './neo4j-routing.module';
import {Neo4jService} from './services';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {RequestInterceptor, SharedModule} from '../shared';

const components = [
  Neo4jComponent
];

const services = [
  Neo4jService
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
    RouterModule,
    HttpClientModule,
    Neo4jRoutingModule,
    SharedModule
  ],
  providers: [
    ...services,
    { provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true }
  ]
})
export class Neo4jModule {

}
