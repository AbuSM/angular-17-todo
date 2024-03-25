import { Routes } from '@angular/router';
import { AddRouteComponent } from './add-route/add-route.component';
import { ListRouteComponent } from './list-route/list-route.component';
import { FavoriteRouteComponent } from './favorite-route/favorite-route.component';

export const routes: Routes = [
  {
    path: 'add',
    component: AddRouteComponent,
  },
  {
    path: 'list',
    component: ListRouteComponent,
  },
  {
    path: 'favorite',
    component: FavoriteRouteComponent,
  },
];
