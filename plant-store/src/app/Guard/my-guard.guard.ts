import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Resolve, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from '../service/auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class MyGuardGuard implements CanActivate, CanActivateChild {
  constructor(private authService: AuthService){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.authService.isAuthor == false) {
        alert('Bạn chưa Subscribe!')
      }
    return this.authService.isAuthor;
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.authService.isAuthor
  }

}

@Injectable()
export class ProductListResolve implements Resolve<any>{

    constructor(private route: Router , private authService:AuthService ) {
    }

    resolve(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Observable<any> {

      console.log("ProductListResover is called");
      return this.authService.getListProduct();
    }
}
