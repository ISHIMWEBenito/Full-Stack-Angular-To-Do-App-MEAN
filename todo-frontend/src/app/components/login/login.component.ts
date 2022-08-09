import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hide: boolean = true;

  formValues = {
    username : "",
    password : ""
  }

  errorMessage: string;

  constructor(private _service: UserService, private _router: Router, private snackbar: MatSnackBar) { }

  ngOnInit(): void {
  }

  onClickLogin() {
    console.log(this.formValues);
    this._service.login(this.formValues).subscribe((data) => {
      console.log(data);
      sessionStorage.setItem("token", data.token);
      sessionStorage.setItem("userId", data.user._id);
      sessionStorage.setItem("username", data.user.username);
      this.snackbar.open("Login successfull. Welcome to Todo App.", "close", {
        verticalPosition: "top"
      });
      this._router.navigate(['/home']);
    }, err => {
      console.log(err);
      this.errorMessage = err.error.error;
    })
  }

}
