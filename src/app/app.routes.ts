import { Routes } from '@angular/router';
import { logoutActivateGuard } from './guards/logout-activate.guard';
import { loginActivateGuard } from './guards/login-activate.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('src/app/auth/auth.routes').then((m) => m.authRoutes),
    canActivate: [logoutActivateGuard]//en las rutas se incorporan los guardianes
  },
  {
    path: 'post',
    loadChildren: () =>
      import('src/app/post/post.routes').then((m) => m.postsRoutes),
    canActivate: [loginActivateGuard]//en las rutas se incorporan los guardianes
  },
  {
    path: 'post-detail',
    loadComponent: () => import('./posts/post-detail/post-detail.page').then( m => m.postDetailPage)
  },
  {
    path: 'post-info',
    loadComponent: () => import('./posts/post-detail/post-info/post-info.page').then( m => m.PostInfoPage)
  },
  {
    path: 'post-comments',
    loadComponent: () => import('./posts/post-detail/post-comments/post-comments.page').then( m => m.PostCommentsPage)
  },
  {
    path: 'post-comments',
    loadComponent: () => import('./posts/post-detail/post-comments/post-comments.page').then( m => m.PostCommentsPage)
  },
  {
    path: 'post-profile',
    loadComponent: () => import('./posts/post-profile/post-profile.page').then( m => m.PostProfilePage)
  },
  
  
  {
    path: 'post-info',
    loadComponent: () => import('./posts/post-profile/post-info/post-info.page').then( m => m.PostInfoPage)
  },
  
];