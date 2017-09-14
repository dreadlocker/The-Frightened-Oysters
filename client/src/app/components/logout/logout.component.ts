import { UsersService } from './../../services/users.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {
  errorMessage: string;

  constructor(private router: Router, private userService: UsersService) { }

  ngOnInit() {
    const handleSuccessResponse = () => {
      this.router.navigate(['home']);
    };
    const handleError = (errorMessage: string) => {
      this.errorMessage = errorMessage;
    };

    this.userService.logout()
      .subscribe(handleSuccessResponse, handleError);
  }

}
