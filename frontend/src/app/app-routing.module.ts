import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '@core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/home'
  },
  {
    path: '',
    children: [
      {
        path: 'login',
        loadChildren: () => import('@features/login/login.module').then(m => m.LoginModule)
      },
      {
        path: 'signup',
        loadChildren: () => import('@features/signup/signup.module').then(m => m.SignupModule)
      },
      {
        path: 'home',
        canActivate: [AuthGuard],
        loadChildren: () => import('@features/home/home.module').then(m => m.HomeModule)
      },
      {
        path: 'dashboard',
        canActivate: [AuthGuard],
        loadChildren: () => import('@features/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
    ] 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
