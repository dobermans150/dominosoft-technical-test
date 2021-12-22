import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { EmployeeGuard } from './guards/employee.guard';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  {
    path: '',
    /* component:, */
    children: [
      {
        path: '',
        redirectTo: '/auth/login',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminModule),
    canActivate: [AuthGuard, LoginGuard],
  },
  {
    path: 'employee',
    loadChildren: () =>
      import('./employees/employees.module').then((m) => m.EmployeesModule),
    canActivate: [AuthGuard, EmployeeGuard],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
