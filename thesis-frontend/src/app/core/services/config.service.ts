import {Inject, Injectable} from '@angular/core';
import {CONFIG} from '../tokens';
import {IConfig} from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  readonly #config: IConfig;

  constructor(@Inject(CONFIG) config: IConfig) {
    this.#config = config;
  }

  getConfig(key: string): any {
    return this.#config[key];
  }

}
