import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../common/user';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private user: BehaviorSubject<User>;
  listAccount: User[] = [];
  accAdmin = [
  {
    name: 'admin',
    email: 'admin1@gmail.com',
    password:'123456'
  }
  ]
  constructor(
    private http: HttpClient,
    private router: Router,
    public toastService: ToastService
  ) {
    const _user = localStorage.getItem('user') || {}
    this.user = new BehaviorSubject<User>(_user as User);
    this.getListAccount();
   }

  setCurrentURL(data: string) {
    let url = data.split('/')[3]
    localStorage.setItem('currentURL', url)
  }

  getCurrentURL() {
    return localStorage.getItem('currentURL')
  }

  getUser(): Observable<any> {
     return this.user as Observable<any>;
  }

  setUser(user: User): void {
     this.user.next(user);
  }

  isLoggedIn() {
    return !!localStorage.getItem('user') // return true of false
  }

  creatAccount(user_info: Object):Observable<User> {
      return this.http.post<User>(`${environment.apiUrl}/account.json`, user_info)
      .pipe(
        tap(() => console.log('Crate success!'))
      )
  }

  getAccount(){
    return this.http.get<{[id: string]: User}>(`${environment.apiUrl}/account.json`)
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

  getListAccount() {
    this.getAccount().subscribe(
      (data: User[]) => {
        this.listAccount = data;
        // console.log(this.listAccount);
      }, err => {
        this.toastService.showError()
      })
  }

  signUp(data: User) {
    this.creatAccount(data).subscribe(
         data => {
           this.toastService.showSignUpSuccess();
           setTimeout(() => {
             this.router.navigateByUrl('/login')
           }, 3000);
         }, err => {
           this.toastService.showError()
         }
       )
  }

  logIn(data: User) {

    if(data){
      const user: any = this.listAccount.find((el: User) => {
        return el.email === data.email && el.password === data.password
      });

      const admin: any = this.accAdmin.find((el: any) => {
        return el.email === data.email && el.password === data.password
      });

      if(user) {
        this.toastService.showLoginSuccess();
        localStorage.setItem('user', JSON.stringify(user));
        this.setUser(user);

        const currentURL:any = localStorage.getItem('currentURL');
          if(currentURL) {
            this.router.navigate([`${currentURL}`]);
            localStorage.removeItem('currentURL')
          } else {
            this.router.navigate(['home-page'])
          }
      } else if(admin) {
        this.router.navigate(['admin']);
        localStorage.setItem('admin', JSON.stringify(this.accAdmin));
        this.setUser(admin);
      } else{
        this.toastService.showLoginError();
      }
    }
  }

  logout() {
      localStorage.removeItem('user');
  }

}
