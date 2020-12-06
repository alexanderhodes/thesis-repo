import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ResourceOverviewComponent, ResourceDetailComponent} from './components/public-api';

const routes: Routes = [
  {
    path: '',
    component: ResourceOverviewComponent
  },
  {
    path: ':node/:uuid',
    component: ResourceDetailComponent
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
export class ResourcesRoutingModule {

}
