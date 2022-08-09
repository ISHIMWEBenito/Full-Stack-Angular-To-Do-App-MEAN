import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthguardService } from './services/authguard.service';
import { HomeguardService } from './services/homeguard.service';

const routes: Routes = [
  {path: "", redirectTo: "/home", pathMatch: "full"},
  {path: "login", component: LoginComponent, canActivate: [AuthguardService]},
  {path: "register", component: RegisterComponent, canActivate: [AuthguardService]},
  {path: "home", component: HomeComponent, canActivate: [HomeguardService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
