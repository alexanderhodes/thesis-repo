import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {QualificationsComponent} from './components/public-api';

const routes: Routes = [
  {
    path: '',
    component: QualificationsComponent
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
export class QualificationsRoutingModule {

}
