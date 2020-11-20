import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {OccupationsComponent} from './components/public-api';

const routes: Routes = [
  {
    path: '',
    component: OccupationsComponent
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
