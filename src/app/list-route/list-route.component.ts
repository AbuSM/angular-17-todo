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
export class ListRouteComponent implements OnInit, OnDestroy {
  title = 'List Route';
  todayTodos$: Observable<IData[] | []> = new Observable<IData[] | []>().pipe(
    startWith([])
  );
  upcomingTodos: IData[] = [];
  subscriptions: Subscription = new Subscription();

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    console.log('ListRouteComponent initialized');
    this.todayTodos$ = this.apiService.getTodayTodos();
    this.subscriptions.add(
      this.apiService.getUpcomingTodos().subscribe((data) => {
        console.log('data from getUpcomingTodos: ', data);
        this.upcomingTodos = data;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
