import {Injectable, OnDestroy} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

const STORAGE_KEY: string = 'ts-data';

export const STORAGE_USER = 'user';

@Injectable({
  providedIn: 'root'
})
export class StateService implements OnDestroy {

  #state$: {[key: string]: BehaviorSubject<any>};
  #state: {[key: string]: any};

  constructor() {
    const storageData = localStorage.getItem(STORAGE_KEY);
    const data = JSON.parse(storageData);
    this.initState(data);
  }

  ngOnDestroy(): void {
    this.completeSubscriptions();
  }

  setItem(key: string, value: any) {
    if (this.#state[key]) {
      this.#state$[key].next(value);
    } else {
      // key is not existing at this moment
      this.#state$[key] = new BehaviorSubject<any>(value);
    }
    this.#state[key] = value;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.#state));
    console.log('updatedState', this.#state);
  }

  removeItem(key: string) {
    this.#state$[key].next(null);
    this.#state$[key] = null;
    this.#state[key] = null;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(JSON));
  }

  getItem$(key: string): Observable<any> {
    return this.#state$[key].asObservable();
  }

  getItem(key: string): any {
    const value = this.#state[key];
    return value ? value : null;
  }

  clear(): void {
    this.completeSubscriptions();
    this.initState({});
  }

  private initState(data: any): void {
    this.#state$ = {};
    this.#state = {};
    // initialize state
    if (data) {
      Object.keys(data).forEach((key) => {
        const value = data[key];
        this.#state$[key] = new BehaviorSubject<any>(value);
        this.#state[key] = value;
      });
    }
    console.log('init state', this.#state);
  }

  private completeSubscriptions(): void {
    Object.keys(this.#state$).forEach(key => {
      // end subscriptions
      this.#state$[key].complete();
    });
  }

}
