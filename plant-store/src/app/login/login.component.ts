import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User} from '../common/user';
import { AccountService } from '../service/account.service';
import { MessengerService } from '../service/messenger.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm!: FormGroup;
  listAccount: User[] = [];
  accAmin: any = [];
  constructor(
    private route: Router,
    private accountService: AccountService,
    private fb: FormBuilder,
    private msg: MessengerService
  ) {}

  ngOnInit(): void {
    this.getListAccount();
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['',Validators.required]
    })

    this.accAmin = this.accountService.accountAdmin()
  }

  getListAccount() {
    this.accountService.getAccount().subscribe(
      (data: User[]) => {
        this.listAccount = data;
        console.log(this.listAccount);
      }, err => {
        alert('Something went wrong!! ');
      })
  }

  login() {
    if(this.loginForm.value){
      const user: any = this.listAccount.find((el: User) => {
        return el.email === this.loginForm.value.email && el.password === this.loginForm.value.password
      });

      const admin: any = this.accAmin.find((el: any) => {
        return el.email === this.loginForm.value.email && el.password === this.loginForm.value.password
      });

      if(user) {
        alert('Login Success!');
        this.loginForm.reset();
        this.route.navigate(['home-page']);
        localStorage.setItem('user', JSON.stringify(user))
      } else if(admin) {
        alert('Welcome to dashboard!');
        this.loginForm.reset();
        this.route.navigate(['admin']);
        localStorage.setItem('admin', JSON.stringify(admin))
      } else {
        alert('User not found!');
      }
    }
  }

}
