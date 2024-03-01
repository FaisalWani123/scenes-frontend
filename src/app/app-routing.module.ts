import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {LandingPageComponent} from './landing-page/landing-page.component';
import {MainPageComponent} from './main-page/main-page.component';

const routes: Routes = [

  { path: 'login', component: LoginComponent },
  {path : 'register', component: RegisterComponent},
  {path : 'landing-page', component: LandingPageComponent},
  {path : 'main-page', component: MainPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
