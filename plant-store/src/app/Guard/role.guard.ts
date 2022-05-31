import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor( private router: Router) {}
  canActivate() {
    let Role = localStorage.getItem('admin')

    if(Role) {
      return true
    } else {
      this.router.navigate(['login']);
      return false;
    }
  }

}
