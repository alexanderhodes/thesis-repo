import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {SharedModule} from '../shared';
import {PermissionRouteGuard, PrivateKeyGuard, RoleRouteGuard} from './guards';
import {HeaderComponent, HeaderItemComponent} from './header';
import {ApiPrefixInterceptor, HttpErrorInterceptor, HttpTokenInterceptor} from './interceptor';
import {HasPermissionDirective, HasRoleDirective} from './directives';
import {ConfigService, RoleService} from './services';
import {
  DbRelationApiService,
  DbRelationStructureApiService,
  GraphApiService,
  LoginApiService,
  ObjectApiService,
  ObjectStructureApiService,
  PermissionsApiService,
  RolesApiService,
  TransactionsApiService,
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
  PrivateKeyGuard,
  RoleRouteGuard
];

const services = [
//  PermissionService,
  ConfigService,
  RoleService,
  GraphApiService,
  LoginApiService,
  ObjectApiService,
  ObjectStructureApiService,
  PermissionsApiService,
  DbRelationApiService,
  DbRelationStructureApiService,
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
