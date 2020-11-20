import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../shared';
import {OccupationsComponent} from './components/public-api';
import {OccupationsRoutingModule} from './occupations-routing.module';

const components = [
  OccupationsComponent
];

@NgModule({
  declarations: [
    ...components
  ],
  exports: [],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    SharedModule,
    OccupationsRoutingModule
  ],
  providers: []
})
export class OccupationsModule {

}
