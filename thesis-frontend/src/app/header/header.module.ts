import {NgModule} from '@angular/core';
import {HeaderComponent} from './header.component';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../shared';
import {RouterModule} from '@angular/router';

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
        SharedModule,
        RouterModule
    ],
  providers: []
})
export class HeaderModule {

}
