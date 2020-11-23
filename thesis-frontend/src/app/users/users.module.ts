import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {CreateUserComponent, UserDetailComponent, UserListComponent} from './components';
import {UserRoutingModule} from './user-routing.module';
import {SharedModule} from '../shared';
import {CoreModule} from '../core';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';

const components = [
  CreateUserComponent,
  UserDetailComponent,
  UserListComponent
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
        SharedModule,
        CoreModule,
        FontAwesomeModule
    ],
  providers: []
})
export class UsersModule {

}
