import { Routes } from '@angular/router';

export const profileRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('src/app/post/profile/post-profile.page').then((m) => m.PostProfilePage),
  },
  {
    path: ':id',
    pathMatch: 'full',
    loadComponent: () => import('src/app/post/profile/post-profile.page').then((m) => m.PostProfilePage),
  },
  {
    path: 'me',
    pathMatch: 'full',
    loadComponent: () => import('src/app/post/profile/post-profile.page').then((m) => m.PostProfilePage),
  },
];
