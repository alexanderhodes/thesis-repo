import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ConfigurationComponent, UpdateObjectComponent, UpdateRelationComponent} from './components/public-api';

const routes: Routes = [
  {
    path: '',
    component: ConfigurationComponent
  },
  {
    path: 'object/:name',
    component: UpdateObjectComponent
  },
  {
    path: 'relation/:name',
    component: UpdateRelationComponent
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
