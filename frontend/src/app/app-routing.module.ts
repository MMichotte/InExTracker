import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

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
        path: 'home',
        loadChildren: () => import('@features/home/home.module').then(m => m.HomeModule)
      },
    ] 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
