import { Routes } from '@angular/router';

export const postDetailRoutes: Routes = [
  {
    path: 'info',
    loadComponent: () =>
      import('./post-info/post-info.page').then(
        (m) => m.PostInfoPage
      ),
  },
  {
    path: 'comments',
    loadComponent: () =>
      import('./post-comments/post-comments.page').then(
        (m) => m.postCommentsPage
      ),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'info', // Por defecto
  },
];