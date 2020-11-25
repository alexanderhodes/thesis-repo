import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpBackend, HttpClient, HttpClientModule} from '@angular/common/http';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {CONFIG, CoreModule} from './core';
import {SharedModule} from './shared';
import {catchError, map} from 'rxjs/operators';
import {of} from 'rxjs';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, '/assets/i18n/', '.json');
}

// export function ConfigLoaderFactory(handler: HttpBackend) {
//   const httpClient = new HttpClient(handler);
//   return httpClient.get('/assets/config.json')
//     .pipe(
//       map(value => {
//         console.log('value', value);
//         return value;
//       }),
//       catchError((err, caught) => {
//         console.log('loading config failed');
//         return of({
//           apiUrl: ''
//         });
//       })
//     );
// }

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CoreModule.forRoot(),
    SharedModule,
    TranslateModule.forRoot({
      defaultLanguage: 'de',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
