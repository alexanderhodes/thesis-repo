import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CreateUserComponent, UserListComponent} from './components/public-api';
import {UsersApiService} from './services/users-api.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {UserRoutingModule} from './user-routing.module';
import {SharedModule} from '../shared';

const components = [
  CreateUserComponent,
  UserListComponent
];

const services = [
  UsersApiService
];

@NgModule({
  declarations: [
    ...components
  ],
  exports: [
    ...components
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    UserRoutingModule,
    SharedModule
  ],
  providers: [
    ...services
  ]
})
export class UsersModule {

}
