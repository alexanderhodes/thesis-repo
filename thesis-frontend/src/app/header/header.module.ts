import {NgModule} from '@angular/core';
import {HeaderComponent} from './header.component';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../shared';

const components = [
  HeaderComponent
];

@NgModule({
  declarations: [
    ...components
  ],
  exports: [
    ...components
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  providers: []
})
export class HeaderModule {

}
