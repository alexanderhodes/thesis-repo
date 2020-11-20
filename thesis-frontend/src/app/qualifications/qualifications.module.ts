import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../shared';
import {QualificationsComponent} from './components/public-api';
import {QualificationsApiService} from './services/qualifications-api.service';
import {QualificationsRoutingModule} from './qualifications-routing.module';

const components = [
  QualificationsComponent
];

const services = [
  QualificationsApiService
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
    QualificationsRoutingModule
  ],
  providers: [
    ...services
  ]
})
export class QualificationsModule {

}
