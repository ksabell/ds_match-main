import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {LoginAuthGuard} from './guards/login-auth.guard';

// ADD ROUTE GUARDS
const routes: Routes = [
  { path: '', component: LoginComponent, canActivate: [LoginAuthGuard] },
  // { path: 'dashboard', component: DashboardComponent, canActivate: [LoginAuthGuard] },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
    canActivate: [LoginAuthGuard]
  },

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ]
})
export class AppRoutingModule { }
