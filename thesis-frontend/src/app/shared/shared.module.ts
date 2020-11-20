import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ErrorMessageComponent, SuccessMessageComponent} from './components/public-api';

const components = [
  ErrorMessageComponent,
  SuccessMessageComponent
];
// ToDo: Integrate Interceptor
const services = [];

@NgModule({
  declarations: [
    ...components
  ],
  exports: [
    ...components
  ],
  imports: [
    CommonModule
  ],
  providers: []
})
export class SharedModule {

}
