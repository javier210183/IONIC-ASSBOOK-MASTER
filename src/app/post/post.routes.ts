import { Routes } from '@angular/router';

export const postsRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'add',
    loadComponent: () =>
      import('./posts-form/posts-form.page').then((m) => m.PostFormPage),
  },
  {
    path: ':id',
    loadComponent: () =>
      import('src/app/posts/post-detail/post-detail.page').then(
        (m) => m.postDetailPage
      ),
    loadChildren: () =>
      // Child (inner) routes
      import('src/app/posts/post-detail/post-detail.routes').then(
        (m) => m.postDetailRoutes
      ),
  },
  {
    path: 'profile/:id',
    loadComponent: () =>
      import('src/app/profile/post-profile.page').then(
        (m) => m.PostProfilePage
      ),
  },
  {
    path: 'edit/:id',
    loadComponent: () => import('src/app/posts-edit-form/posts-edit-form.component').then((m) => m.PostsEditFormComponent),
  },
  {
    path: 'user/:id',
    loadComponent: () =>
      import('src/app/user-profile/user-profile.component').then((m) => m.UserProfileComponent),
  }
];
