import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {SharedModule} from '../shared';
import {PermissionRouteGuard, RoleRouteGuard} from './guards';
import {HeaderComponent, HeaderItemComponent} from './header';
import {ApiPrefixInterceptor, HttpErrorInterceptor, HttpTokenInterceptor} from './interceptor';
import {HasPermissionDirective, HasRoleDirective} from './directives';
import {ConfigService, RoleService} from './services';
import {
  LoginApiService,
  ObjectApiService,
  ObjectStructureApiService,
  PermissionsApiService,
  RolesApiService, TransactionsApiService,
  UsersApiService
} from './http';

const components = [
  HeaderComponent,
  HeaderItemComponent
];

const directives = [
  HasPermissionDirective,
  HasRoleDirective
];

const guards = [
  PermissionRouteGuard,
  RoleRouteGuard
];

const services = [
//  PermissionService,
  ConfigService,
  RoleService,
  LoginApiService,
  ObjectApiService,
  ObjectStructureApiService,
  PermissionsApiService,
  RolesApiService,
  TransactionsApiService,
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
//    ...guards,
//    ...services,

  ]
})
export class CoreModule {

  static forRoot(): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
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
    };
  }

}
