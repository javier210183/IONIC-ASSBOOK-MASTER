import { Routes } from "@angular/router";

export const postsRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('./home/home.page').then(m => m.HomePage),
  },
  {
    path: 'add',
    loadComponent: () =>
      import('./posts-form/posts-form.page').then(
        (m) => m.PostFormPage
      ),
  },
  {
    path: ':id',
    loadComponent: () =>
      import('src/app/posts/post-detail/post-detail.page').then(
        (m) => m.postDetailPage
      ),
    loadChildren: () => // Child (inner) routes
      import('src/app/posts/post-detail/post-detail.routes').then((m) => m.postDetailRoutes),
  },
];