import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {Neo4jComponent} from './components';

const routes: Routes = [
  {
    path: '',
    component: Neo4jComponent,
  }
];

@NgModule({
  exports: [
    RouterModule
  ],
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class Neo4jRoutingModule {

}
