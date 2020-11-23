import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UserDetailComponent, UserListComponent} from './components';

const routes: Routes = [
  {
    path: '',
    component: UserListComponent
  },
  // {
  //   path: 'create',
  //   component: CreateUserComponent
  // },
  {
    path: ':id',
    component: UserDetailComponent
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
export class UserRoutingModule {

}
