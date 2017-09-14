import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsersService } from './../../services/users.service';
import { Router } from '@angular/router';

import { ICookie } from './../../models/ICookie';
import { ILoginUser } from './../../models/ILoginUser';
import { IError } from './../../models/IError';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public errorMessage: string;

  public username: FormControl;
  public password: FormControl;

  public loginForm: FormGroup;

  constructor(private router: Router, private userService: UsersService) { }

  ngOnInit() {
    this.buildLoginFormsData();
  }

  buildLoginFormsData() {
    this.username = new FormControl('', [
      Validators.required
    ]);

    this.password  = new FormControl('', [
      Validators.required
    ]);

    this.loginForm = new FormGroup({
      username: this.username,
      password: this.password
    });
  }

  login(userData: ILoginUser) {
    const handleSuccessResponse = (cookie: ICookie) => {
      this.errorMessage = undefined;
      this.router.navigate(['home']);
    };
    const handleError = (error: IError) => {
      this.errorMessage = error.message;
      this.username.setValue('');
      this.password.setValue('');
      this.loginForm.markAsUntouched();
    };

    this.userService.login(userData)
      .subscribe(handleSuccessResponse, handleError);
  }

}
