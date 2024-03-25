import { Component } from '@angular/core';
import { DatatableComponent } from '../datatable/datatable.component';

@Component({
  selector: 'app-favorite-route',
  standalone: true,
  imports: [DatatableComponent],
  templateUrl: './favorite-route.component.html',
  styleUrl: './favorite-route.component.css',
})
export class FavoriteRouteComponent {}
