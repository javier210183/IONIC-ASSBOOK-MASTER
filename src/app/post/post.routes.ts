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
        (m) => m.PostsFormPage
      ),
  },
];