import { PublicGuardService } from './../../services/guards/public-guard.service';
import { LogoutComponent } from './../../components/logout/logout.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from '../../components/login/login.component';
import { SignUpComponent } from '../../components/sign-up/sign-up.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full', },
  { path: 'login', component: LoginComponent, canActivate: [PublicGuardService] },
  { path: 'signup', component: SignUpComponent, canActivate: [PublicGuardService] },
  { path: 'logout', component: LogoutComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
