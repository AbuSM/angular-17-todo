import { Injectable } from '@angular/core';
import { StorageMap } from '@ngx-pwa/local-storage';
import { STORAGE_KEY } from '../../constants';
import { IData } from '../../types';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor(private asyncLocalStorage: StorageMap) {}

  setItem(value: any, key: string = STORAGE_KEY) {
    console.log('value: ', value);
    return this.asyncLocalStorage.set(key, value);
  }

  getItem(key: string = STORAGE_KEY): Observable<IData[]> {
    return this.asyncLocalStorage.get(key).pipe(
      map((data: any) => {
        return data;
      })
    ) as Observable<IData[]>;
  }
}
