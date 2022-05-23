import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor() { }

  isLoggedIn() {
    return !!localStorage.getItem('user')
  }
  canExit() {
    if(confirm('Bạn muốn thoát?')) {
      return true
    }
    return false
  }

}
