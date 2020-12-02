import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {OccupationsComponent, ResourceDetailComponent} from './components/public-api';

const routes: Routes = [
  {
    path: '',
    component: OccupationsComponent
  },
  {
    path: ':node/:name',
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
export class OccupationsRoutingModule {

}
