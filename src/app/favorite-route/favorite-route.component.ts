import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatatableComponent } from '../datatable/datatable.component';
import { ApiService } from '../services/api.service';
import { Observable, startWith } from 'rxjs';
import { IData } from '../../types';

@Component({
  selector: 'app-favorite-route',
  standalone: true,
  imports: [DatatableComponent, CommonModule],
  templateUrl: './favorite-route.component.html',
  styleUrl: './favorite-route.component.css',
})
export class FavoriteRouteComponent implements OnInit {
  favoriteTodos$: Observable<IData[] | []> = new Observable<
    IData[] | []
  >().pipe(startWith([]));

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    console.log('FavoriteRouteComponent initialized');
    this.favoriteTodos$ = this.apiService.getFavoriteTodos();
  }
}
