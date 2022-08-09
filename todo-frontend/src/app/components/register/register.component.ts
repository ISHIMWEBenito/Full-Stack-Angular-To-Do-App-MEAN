import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  formValues: any = {
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
  }

  errorMessage: string;

  


  hide: boolean = true;
  constructor(private _service: UserService, private _router: Router, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  onClickRegister() {
    console.log(this.formValues);
    this._service.register(this.formValues).subscribe((data) => {
      console.log(data);
      this._router.navigate(['/login']);
      this._snackBar.open("Registration Successfull, Please, login to continue.", "", {
        verticalPosition: "top",
        duration: 2000
      })
    }, err => {
      console.log(err);
      this.errorMessage = err.error.error;
    })
  }

}
