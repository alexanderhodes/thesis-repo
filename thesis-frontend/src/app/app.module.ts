import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {Neo4jModule} from './neo4j';
import {ColModule} from './col';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    Neo4jModule,
    ColModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
