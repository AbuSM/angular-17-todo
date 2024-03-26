import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatatableComponent } from '../datatable/datatable.component';
import { ApiService } from '../services/api.service';
import { IData } from '../../types';
import { Subscription, startWith, Observable } from 'rxjs';

@Component({
  selector: 'app-list-route',
  standalone: true,
  imports: [DatatableComponent, CommonModule],
  templateUrl: './list-route.component.html',
  styleUrl: './list-route.component.css',
})
export class ListRouteComponent implements OnDestroy {
  title = 'List Route';
  todayTodos: IData[] = [];
  todayTodos$: Observable<IData[] | []> = new Observable<IData[] | []>().pipe(
    startWith([])
  );
  upcomingTodos: IData[] = [];
  upcomingTodos$: Observable<IData[] | []> = new Observable<
    IData[] | []
  >().pipe(startWith([]));
  subscriptions: Subscription = new Subscription();

  constructor(private apiService: ApiService) {
    this.update();
  }

  handleFavorite(id: string) {
    this.apiService.toggleFavoriteTodo(id).subscribe(() => {
      this.update();
    });

    this.update();
  }

  handleRemove(id: string) {
    this.apiService.deleteTodoById(id).subscribe(() => {
      this.update();
    });
  }

  update() {
    this.todayTodos$ = this.apiService.getTodayTodos();
    this.upcomingTodos$ = this.apiService.getUpcomingTodos();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
