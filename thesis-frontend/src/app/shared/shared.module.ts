import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';
import {ChevronDownComponent, ChevronUpComponent, ErrorMessageComponent, SuccessMessageComponent} from './components';
import {ButtonDirective, InputDirective} from './directives';

const components = [
  ChevronDownComponent,
  ChevronUpComponent,
  ErrorMessageComponent,
  SuccessMessageComponent
];

const directives = [
  ButtonDirective,
  InputDirective,
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
  providers: []
})
export class SharedModule {

}
