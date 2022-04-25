import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../common/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  model = new User();
  constructor(
    private route: Router
  ) { }

  ngOnInit(): void {
  }



  onSubmit(form: any) {

    console.log(form.value)

    // console.log("User Name:", this.model.name)
    // console.log("User password:", this.model.password)

    if(this.model.name != '' || this.model.name != null && this.model.password != ''){
      this.route.navigateByUrl('/home-page')
    }
  }
}