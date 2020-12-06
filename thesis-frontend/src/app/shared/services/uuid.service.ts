import * as uuid from 'uuid';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UuidService {

  generateV4Uuid(): string {
    return uuid.v4();
  }

}
