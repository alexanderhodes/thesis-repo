import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';
import {ErrorMessageComponent, SuccessMessageComponent} from './components';
import {ButtonDirective, InputDirective} from './directives';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';

const components = [
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
    ...directives
  ],
  exports: [
    ...components,
    ...directives,
    TranslateModule
  ],
  imports: [
    CommonModule,
    FontAwesomeModule
  ],
  providers: []
})
export class SharedModule {

}
