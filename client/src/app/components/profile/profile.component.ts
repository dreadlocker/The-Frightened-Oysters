import { IError } from './../../models/IError';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from './../../services/users.service';
import { IUser } from './../../models/IUser';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: IUser;

  public username: FormControl;
  public newPassword: FormControl;
  public company: FormControl;
  public phone: FormControl;
  public address: FormControl;
  public email: FormControl;
  public avatarUrl: FormControl;

  public profileForm: FormGroup;

  public errorMessage: string;
  public successMessage: string;

  constructor(private activateRoute: ActivatedRoute, private userService: UsersService) { }

  ngOnInit() {
    this.user = this.activateRoute.snapshot.data['user'];
    this.buildProfileFormsData();
  }

  buildProfileFormsData() {
    this.username = new FormControl(this.user.username);
    this.username.disable();

    this.newPassword  = new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(100)
    ]);

    this.company  = new FormControl(this.user.company, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(100)
    ]);

    this.phone  = new FormControl(this.user.phone, [
      Validators.required
    ]);

    this.address  = new FormControl(this.user.address, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(150)
    ]);

    this.email  = new FormControl(this.user.email, [
      Validators.required,
      Validators.email
    ]);

    this.avatarUrl  = new FormControl(this.user.avatarUrl, [
      Validators.required,
      Validators.pattern('https?://.+')
    ]);

    this.profileForm = new FormGroup({
      username: this.username,
      newPassword: this.newPassword,
      company: this.company,
      phone: this.phone,
      address: this.address,
      email: this.email,
      avatarUrl: this.avatarUrl
    });
  }

  update(userData) {
    const userUpdateInfo: IUser = {
      username: '',
      password: userData.newPassword,
      company: userData.company,
      phone: userData.phone,
      address: userData.address,
      email: userData.email,
      avatarUrl: userData.avatarUrl
    };

    const handleSuccessResponse = (updatedUser: IUser) => {
      this.successMessage = 'Profile has been updated';
      this.user = updatedUser;
      this.newPassword.setValue('');
      this.newPassword.markAsUntouched();
    };
    const handleError = (error: IError) => {
      this.successMessage = undefined;
      this.errorMessage = error.message;
      this.profileForm.markAsUntouched();
    };

    this.userService.update(userUpdateInfo)
      .subscribe(handleSuccessResponse, handleError);
  }

}
