import { Injectable } from '@angular/core';
import { StorageMap } from '@ngx-pwa/local-storage';
import { STORAGE_KEY } from '../../constants';
import { IData } from '../../types';
import { Observable, map, timer, delay, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor(private asyncLocalStorage: StorageMap) {}

  setItem(value: any, key: string = STORAGE_KEY) {
    console.log('storage value: ', value);
    return this.asyncLocalStorage.set(key, value).pipe(delay(100));
  }

  getItem(key: string = STORAGE_KEY) {
    return timer(100).pipe(
      switchMap(
        () => this.asyncLocalStorage.get(key) as Observable<IData[] | []>
      )
    );
  }
}
