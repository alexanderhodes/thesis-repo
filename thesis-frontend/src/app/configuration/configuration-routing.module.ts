import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ConfigurationComponent, ObjectDetailComponent} from './components/public-api';

const routes: Routes = [
  {
    path: '',
    component: ConfigurationComponent
  },
  {
    path: 'object/:name',
    component: ObjectDetailComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class ConfigurationRoutingModule {

}
