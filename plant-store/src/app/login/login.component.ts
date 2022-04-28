import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../common/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  model = new User();
  @ViewChild('loginForm', { static: true }) loginForm!: NgForm;

  constructor(
    private route: Router
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    if(this.model.name != '' || this.model.name != null && this.model.password != ''){
      console.log(this.model)
      this.route.navigateByUrl('/home-page')
      this.loginForm.reset();
    }
  }
}
