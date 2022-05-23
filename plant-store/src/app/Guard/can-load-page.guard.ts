import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class CanLoadPageGuard implements CanLoad {
    constructor( private  authService: AuthService) {
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

    let url: any = route.path;
    if (url == 'product-list') {
      let text = 'Bạn chưa đăng nhập';
      if(confirm(text) == true){
        return true
       }
      }
      return false;
  }

}
