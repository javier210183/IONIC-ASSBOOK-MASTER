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
    canActivate: [logoutActivateGuard], //en las rutas se incorporan los guardianes
  },
  {
    path: 'post',
    loadChildren: () =>
      import('src/app/post/post.routes').then((m) => m.postsRoutes),
    canActivate: [loginActivateGuard], //en las rutas se incorporan los guardianes
  },
  {
    path: 'users',
    loadChildren: () =>
      import('src/app/post/profile/profile.routes').then((m) => m.profileRoutes),
    canActivate: [loginActivateGuard], //en las rutas se incorporan los guardianes
  },
];
