import {NgModule} from '@angular/core';
import {RequestInterceptor} from './interceptors';

const services = [RequestInterceptor];

@NgModule({
  declarations: [],
  exports: [],
  imports: [],
  providers: []
})
export class SharedModule {

}
