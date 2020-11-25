import {enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {AppModule} from './app/app.module';
import {environment} from './environments/environment';
import {CONFIG} from './app/core/tokens';
import {IConfig} from './app/core/interfaces';

fetch('/assets/config.json')
  .then((response) => response.json())
  .then((config: IConfig) => {
    if (environment.production) {
      enableProdMode();
    }

    platformBrowserDynamic(
      [{provide: CONFIG, useValue: config}]
    ).bootstrapModule(AppModule)
      .catch(err => console.error(err));
  });
