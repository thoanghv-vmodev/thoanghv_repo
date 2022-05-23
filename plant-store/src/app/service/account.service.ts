import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from '../common/user';
import { catchError, delay, map} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(
  private http: HttpClient) { }

  private apiUrl = 'https://plant-store-b3138-default-rtdb.firebaseio.com/'

  creatAccount(user_info: Object):Observable<User> {
      return this.http.post<User>(`${this.apiUrl}/account.json`, user_info)
      .pipe(
        tap(() => console.log('Crate success!'))
      )
  }

  getAccount(){
    return this.http.get<{[id: string]: User}>(`${this.apiUrl}/account.json`)
    .pipe(
      map(account => {
        let listAccount: User[] = [];
        for(let id in account) { // lap qua object gan key name = id
          listAccount.push({...account[id], id});
        }
        return listAccount
      })
    )
  }

  accAdmin = [
    {
      name: 'Admin',
      email: 'admin1@gmail.com',
      password:'plant01'
    }
  ]

  accountAdmin() {
    return this.accAdmin
  }

}
