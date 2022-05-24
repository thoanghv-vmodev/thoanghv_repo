import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ProductDetailsComponent } from '../product/product-details/product-details.component';
import { AuthService } from '../service/auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class CanDeactivateGuard implements CanDeactivate<ProductDetailsComponent> {
  constructor(private authService: AuthService) {}

  canDeactivate(
    component: ProductDetailsComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true
  }
}
