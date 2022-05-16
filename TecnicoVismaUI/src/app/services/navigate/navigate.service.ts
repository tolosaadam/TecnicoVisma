import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavigateService {

  constructor(private router:Router) { }

  goToLogin(){
    this.router.navigate(['login']);
  }

  goToRegistry(){
    this.router.navigate(['registry']);
  }

  goToHome(){
    this.router.navigate(['home']);
  }

  logOut(){
    this.router.navigate(['login']);
  }
}
