import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { ViewEmployeeComponent } from './view-employee/view-employee.component';

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'login', component: LoginComponent },
  { path: 'sign-up', component: SignupComponent },
  { path: 'add-employee/_add', component: AddEmployeeComponent },
  { path: 'view-employee', component: ViewEmployeeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
