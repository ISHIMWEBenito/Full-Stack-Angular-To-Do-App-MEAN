import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isHome: boolean;

  constructor(private router: Router, private _service: UserService, private snackBar: MatSnackBar) { 
    router.events.subscribe((url:any) => {
      if (router.url === "/register" || router.url === "/login") {
        this.isHome = false;
      } else {
        this.isHome = true;
      }
    });
    //console.log(router.url);  // to print only path eg:"/login"
}

  ngOnInit(): void {
  }

  logout(): void {
    this._service.logout();
    this.router.navigate(['/login']);
    this.snackBar.open("Logout successfully.", "", {
      verticalPosition: "top",
      duration: 2000
    });
  }
}
