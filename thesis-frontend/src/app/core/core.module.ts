import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {PermissionRouteGuard, RoleRouteGuard} from './guards';
import {HeaderComponent} from './header';
import {ApiPrefixInterceptor, HttpErrorInterceptor, HttpTokenInterceptor} from './interceptor';
import {SharedModule} from '../shared';
import {HasPermissionDirective} from './directives';
import {PermissionService, RoleService} from './services';
import {LoginApiService, PermissionsApiService, RolesApiService, UsersApiService} from './http';

const components = [
  HeaderComponent
];

const directives = [
  HasPermissionDirective
];

const guards = [
  PermissionRouteGuard,
  RoleRouteGuard
];

const services = [
  PermissionService,
  RoleService,
  LoginApiService,
  PermissionsApiService,
  RolesApiService,
  UsersApiService
];

@NgModule({
  declarations: [
    ...components,
    ...directives
  ],
  exports: [
    ...components,
    ...directives
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule
  ],
  providers: [
    ...guards,
    ...services,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiPrefixInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpTokenInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    }
  ]
})
export class CoreModule {

}
