import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ErrorMessageComponent, SuccessMessageComponent} from './components/public-api';
import {HasPermissionDirective} from './directives/has-permission.directive';
import {PermissionService, RoleService} from './services/public-api';
import {RoleRouteGuard, PermissionRouteGuard} from './guards/public-api';
import {ButtonDirective} from './directives/button.directive';

const components = [
  ErrorMessageComponent,
  SuccessMessageComponent
];

const directives = [
  ButtonDirective,
  HasPermissionDirective
];
// ToDo: Integrate Interceptor
const services = [
  PermissionService,
  RoleService
];
const guards = [
  RoleRouteGuard,
  PermissionRouteGuard
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
    CommonModule
  ],
  providers: [
    ...services,
    ...guards
  ]
})
export class SharedModule {

}
