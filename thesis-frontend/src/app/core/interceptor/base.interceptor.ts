import {ConfigService} from '../services';
import {CleanUpHelper} from '../utils';

export class BaseInterceptor extends CleanUpHelper {

  readonly #nonApiPatterns: string[];

  constructor(protected configService: ConfigService) {
    super();
    this.#nonApiPatterns = configService.getConfig('nonApiPatterns');
  }

  isNonApiPattern(url: string): boolean {
    for (const apiPattern of this.#nonApiPatterns) {
      if (url.indexOf(apiPattern) > -1) {
        return true;
      }
    }
    return false;
  }

}
