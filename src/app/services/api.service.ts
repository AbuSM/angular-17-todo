import { Injectable } from '@angular/core';
import {
  map,
  concatMap,
  Observable,
  tap,
  catchError,
  throwError,
  of,
} from 'rxjs';
import { StorageService } from './storage.service';
import { IData } from '../../types';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private storageService: StorageService) {}

  getTodayTodos(): Observable<IData[] | []> {
    return this.storageService.getItem().pipe(
      map((data: IData[] = []) => {
        if (!data.length) return data;
        return data?.filter((todo) => {
          const todoDate = new Date(todo.expiration_date);
          const today = new Date();
          return (
            todoDate.getDate() === today.getDate() &&
            todoDate.getMonth() === today.getMonth() &&
            todoDate.getFullYear() === today.getFullYear() &&
            (todoDate.getHours() > today.getHours() ||
              (todoDate.getHours() === today.getHours() &&
                todoDate.getMinutes() > today.getMinutes()))
          );
        });
      })
    );
  }

  getUpcomingTodos() {
    return this.storageService.getItem().pipe(
      map((data: IData[]) => {
        if (!data?.length) return data;
        return data.filter((todo) => {
          const todoDate = new Date(todo.expiration_date);
          const today = new Date();
          return (
            todoDate.getDate() > today.getDate() &&
            todoDate.getMonth() > today.getMonth() &&
            todoDate.getFullYear() > today.getFullYear()
          );
        });
      })
    );
  }

  getFavoriteTodos() {
    return this.storageService.getItem().pipe(
      map((data: IData[]) => {
        return data?.filter((todo) => todo.isFavorite);
      })
    );
  }

  toggleFavoriteTodo(id: string) {
    return this.storageService.getItem().pipe(
      map((data: IData[]) => {
        const updatedData = data.map((todo) => {
          if (todo.id === id) {
            return {
              ...todo,
              isFavorite: !todo.isFavorite,
            };
          }
          return todo;
        });

        this.storageService.setItem(updatedData).subscribe();
        return updatedData;
      })
    );
  }

  addNewTodo(todo: IData) {
    this.storageService.getItem().subscribe((data) => {
      if (!data) return this.storageService.setItem([todo]).subscribe();
      const updatedData = [...data, todo];
      return this.storageService.setItem(updatedData).subscribe();
    });
  }

  deleteTodoById(id: string) {
    return this.storageService.getItem().pipe(
      map((data: IData[]) => {
        const updatedData = data.filter((todo) => todo.id !== id);
        console.log('updatedData: ', updatedData);
        this.storageService.setItem([...updatedData]).subscribe();
        return updatedData;
      })
    );
  }
}
