import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';
import {
  ChevronDownComponent,
  ChevronUpComponent,
  ErrorMessageComponent,
  SuccessMessageComponent,
  TrashComponent
} from './components';
import {ButtonDirective, InputDirective} from './directives';
import {BigchainService} from './services';

const components = [
  ChevronDownComponent,
  ChevronUpComponent,
  ErrorMessageComponent,
  SuccessMessageComponent,
  TrashComponent
];

const directives = [
  ButtonDirective,
  InputDirective,
];

const services = [
  BigchainService
];


@NgModule({
  declarations: [
    ...components,
    ...directives,
  ],
  exports: [
    ...components,
    ...directives,
    TranslateModule
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
