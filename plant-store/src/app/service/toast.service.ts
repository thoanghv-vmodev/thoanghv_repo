export interface ToastInfo {
  header: string;
  body: string;
  delay?: number;
}
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor() { }

  toasts: ToastInfo[] = [];

  show(options: any = {}) {
    this.toasts.push({...options});
  }

  remove(toast: any) {
    this.toasts = this.toasts.filter(t => t !== toast);
  }

  clear() {
    this.toasts.splice(0, this.toasts.length);
  }

  showError() {
    this.show({
     header:"Something went wrong!!",
     body: 'bg-danger text-light',
     delay: 3000
    })
  }

  showSignUpSuccess() {
    this.show({
     header:"Signup success!",
     body: 'bg-success text-light',
     delay: 3000
    })
  }

  showLoginError() {
    this.show({
     header:"Wrong account or password, please try again!",
     body: 'bg-danger text-light',
     delay: 3000
    })
  }

  showAddToCartSuccess() {
    this.show({
     header:"Add to cart success!",
     body: 'bg-success text-light',
     delay: 3000
    })
  }

  showCheckoutSuccess() {
    this.show({
     header:"Checkout success!",
     body: 'bg-success text-light',
     delay: 3000
    })
  }

  showEditSuccess() {
    this.show({
     header:"Edit success!",
     body: 'bg-success text-light',
     delay: 3000
    })
  }

  showCreateSuccess() {
    this.show({
     header:"Create success!",
     body: 'bg-success text-light',
     delay: 3000
    })
  }

  showDeleteSuccess() {
    this.show({
     header:"Delete success!",
     body: 'bg-success text-light',
     delay: 3000
    })
  }
}
