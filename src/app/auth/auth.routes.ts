import { Routes } from "@angular/router";
import { logoutActivateGuard } from "../guards/logout-activate.guard";

export const authRoutes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then(m => m.LoginPage),
  },
  {
    path: 'register',
    loadComponent: () => 
        import('./register/register.page').then(m => m.RegisterPage),
  },
  {
    path: 'add',
    loadComponent: () =>
      import('src/app/post/posts-form/posts-form.page').then(
        (m) => m.PostsFormPage
      ),
  },
];