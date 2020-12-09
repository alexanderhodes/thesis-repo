import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent, ValidatePrivateKeyComponent} from './components/public-api';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'validate',
    component: ValidatePrivateKeyComponent
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
export class LoginRoutingModule {

}
