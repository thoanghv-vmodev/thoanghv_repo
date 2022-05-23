import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

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
      alert("You don't have admin!")
      this.router.navigate(['login'])
      return false;
    }
  }

}
