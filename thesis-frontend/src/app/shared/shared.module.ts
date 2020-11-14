import {NgModule} from '@angular/core';
import {RequestInterceptor} from './interceptors';
import {CommonModule} from '@angular/common';
import {ErrorMessageComponent} from './components/public-api';

const components = [
  ErrorMessageComponent
];
// ToDo: Integrate Interceptor
const services = [RequestInterceptor];

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
