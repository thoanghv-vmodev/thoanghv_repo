import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User} from '../common/user';
import { AuthService } from '../service/auth.service';
import { MessengerService } from '../service/messenger.service';
import { ToastService } from '../service/toast.service';

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
    private authService: AuthService,
    private fb: FormBuilder,
    private msg: MessengerService,
  ) {
    this.authService.getUser().subscribe(
      user => {
        if(user?.userName) {
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
