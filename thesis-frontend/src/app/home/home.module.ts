import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {HomeComponent} from './home.component';
import {HomeRoutingModule} from './home-routing.module';

const components = [
  HomeComponent
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
    RouterModule,
    HomeRoutingModule
  ],
  providers: []
})
export class HomeModule {

}
