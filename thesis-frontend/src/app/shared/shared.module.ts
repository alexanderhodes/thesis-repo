import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ErrorMessageComponent, SuccessMessageComponent} from './components/public-api';
import {HasPermissionDirective} from './directives/has-permission.directive';
import {PermissionService} from './services/permission.service';

const components = [
  ErrorMessageComponent,
  SuccessMessageComponent
];

const directives = [
  HasPermissionDirective
];
// ToDo: Integrate Interceptor
const services = [
  PermissionService
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
    ...services
  ]
})
export class SharedModule {

}
