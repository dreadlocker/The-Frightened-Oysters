import { LogoutComponent } from './../../components/logout/logout.component';
import { NgModule } from '@angular/core';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { SignUpComponent } from '../../components/sign-up/sign-up.component';
import { LoginComponent } from '../../components/login/login.component';

@NgModule({
  imports: [
    AuthenticationRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  declarations: [
    LoginComponent,
    SignUpComponent,
    LogoutComponent
  ]
})
export class AuthenticationModule { }
