import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  public isAuthor = false
  constructor() { }

  subscribe() {
    this.isAuthor = true
  }

  unSubscribe() {
    this.isAuthor = false
  }
}
