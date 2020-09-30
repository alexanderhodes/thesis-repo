import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ColComponent} from './components';

const routes: Routes = [
  {
    path: '',
    component: ColComponent
  }
];

@NgModule({
  exports: [
    RouterModule
  ],
  imports: [
    RouterModule.forChild(routes)
  ],
})
export class ColRoutingModule {

}
