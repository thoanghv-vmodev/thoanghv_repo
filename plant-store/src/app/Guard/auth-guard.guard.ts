import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  private currentURL = window.location.href;
  constructor(
    private auth: AuthService,
    private router: Router,
    ){}

  canActivate(){
    if(this.auth.isLoggedIn()) {
      return true
    } else {
      this.auth.setCurrentURL(this.currentURL)
      this.router.navigate(['login']);
      return false
    }
  }
}

