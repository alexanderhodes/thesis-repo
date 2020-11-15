import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {Neo4jModule} from './neo4j';
import {ColModule} from './col';
import {LoginModule} from './login';
import {RequestInterceptor, SharedModule} from './shared';
import {HeaderModule} from './header/header.module';
import {UsersModule} from './users';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {ConfigurationModule} from './configuration';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    Neo4jModule,
    ColModule,
    HeaderModule,
    LoginModule,
    UsersModule,
    SharedModule,
    ConfigurationModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
