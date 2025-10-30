import { Routes } from '@angular/router';

const publicRoutes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./modules/home/home.routes').then(m => m.homeRoutes)
  },
    {
    path: 'hotels',
    loadChildren: () => import('./modules/hotels/hotels.routes').then(m => m.hotelsRoutes)
  }
];

const authRoutes: Routes = [
  // Add authenticated routes here when needed
];

export const routes: Routes = [
  ...publicRoutes,
  ...authRoutes,
  {
    path: '**',
    redirectTo: '/home'
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
];
