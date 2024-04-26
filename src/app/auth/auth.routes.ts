import { Routes } from "@angular/router";
import { loginActivateGuard } from "src/app/guards/login-activate.guard";

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
];