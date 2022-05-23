import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor() { }

  isLoggedIn() {
    return !!localStorage.getItem('user') // return true of false
  }

}
