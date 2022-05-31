import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User} from '../common/user';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm!: FormGroup;
  constructor(
    private route: Router,
    private authService: AuthService,
    private fb: FormBuilder,
  ) {
    this.authService.getUser().subscribe(
      user => {
        let userLocalStorage = localStorage.getItem('user');
        if(user?.userName || userLocalStorage) {
          this.route.navigate(['']);
        }
      }
    )
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['',Validators.required]
    })
  }

  onSubmit() {
    this.authService.logIn(this.loginForm.value);
  }

}
