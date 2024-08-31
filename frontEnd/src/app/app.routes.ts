import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { SignupComponent } from './components/signup/signup.component';
import { UserRequestComponent } from './user-request/user-request.component';
import { RequestManagementComponent } from './components/request-management/request-management.component';
import { BadgesManagementComponent } from './components/badges-management/badges-management.component';
import { UserManagementComponent } from './components/user-management/user-management.component';
import { ReportsComponent } from './components/reports/reports.component';


export const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'signup', component: SignupComponent},
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  { path: 'request', component: UserRequestComponent, canActivate: [AuthGuard]},
  { path: 'manageRequests', component: RequestManagementComponent, canActivate: [AuthGuard]},
  { path: 'manageBadges', component: BadgesManagementComponent, canActivate: [AuthGuard]},
  { path: 'manageUsers', component: UserManagementComponent, canActivate: [AuthGuard]},
  { path: 'reports', component: ReportsComponent, canActivate: [AuthGuard]},
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  // { path: '**', redirectTo: 'dashboard', pathMatch: 'full' },
  // Otras rutas...
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }