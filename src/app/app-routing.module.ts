import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { CreateTestComponent } from './create-test/create-test.component';

const routes: Routes = [
  { path: 'home', component: AdminDashboardComponent },
  { path: 'admin', component: AdminDashboardComponent},
  { path: 'admin/create-test', component: CreateTestComponent},
  { path: '',   redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
