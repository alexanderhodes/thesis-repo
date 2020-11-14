import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserListComponent} from './components/public-api';
import {UsersApiService} from './services/users-api.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {UserRoutingModule} from './user-routing.module';

const components = [
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
    HttpClientModule,
    UserRoutingModule
  ],
  providers: [
    ...services
  ]
})
export class UsersModule {

}
