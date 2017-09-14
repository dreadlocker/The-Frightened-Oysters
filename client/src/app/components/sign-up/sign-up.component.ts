import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsersService } from './../../services/users.service';
import { Router } from '@angular/router';

import { ICookie } from './../../models/ICookie';
import { IUser } from './../../models/IUser';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  public username: FormControl;
  public password: FormControl;
  public company: FormControl;
  public phone: FormControl;
  public address: FormControl;
  public email: FormControl;
  public avatarUrl: FormControl;

  public registerForm: FormGroup;

  constructor(private router: Router, private userService: UsersService) { }

  ngOnInit() {
    this.buildRegisterFormsData();
  }

  buildRegisterFormsData() {
    this.username = new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(100)
    ]);

    this.password  = new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(100)
    ]);

    this.company  = new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(100)
    ]);

    this.phone  = new FormControl('', [
      Validators.required
    ]);

    this.address  = new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(150)
    ]);

    this.email  = new FormControl('', [
      Validators.required,
      Validators.email
    ]);

    this.avatarUrl  = new FormControl('', [
      Validators.required,
      Validators.pattern('https?://.+')
    ]);

    this.registerForm = new FormGroup({
      username: this.username,
      password: this.password,
      company: this.company,
      phone: this.phone,
      address: this.address,
      email: this.email,
      avatarUrl: this.avatarUrl
    });
  }

  register(userData: IUser) {
    const handleSuccessResponse = (cookie: ICookie) => {
      this.router.navigate(['home']);
    };

    this.userService.register(userData)
      .subscribe(handleSuccessResponse);
  }

}
