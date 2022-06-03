import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})



export class RegisterComponent implements OnInit {
   @ViewChild("loading") loading: ElementRef<HTMLElement> | undefined;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) { }

  registerForm!: FormGroup;
  emailIsUsed: any = [];

  ngOnInit(): void {
    this.getAccountUser();
    this.registerForm = this.fb.group ({
    userName: ['', [Validators.required,
                   Validators.minLength(4),
                   Validators.maxLength(32),
                   this.forbiddenUsername(['admin', 'manager', ' '])]],
    email: ['', [Validators.required, Validators.email, this.emailUsed(this.emailIsUsed)]],
    phoneNumber: ['', [Validators.required, Validators.maxLength(10), this.noLetters]],
    password: ['', [Validators.required,
                   Validators.maxLength(32),
                   Validators.minLength(6),
                   this.noWhiteSpace]],
    confirmPassword: ['', [Validators.required, this.confirmationValidator]]
    })

  }

  getAccountUser() {
    this.authService.getAccount().subscribe(
      data => {
        data.forEach(value => {
          this.emailIsUsed.push(value.email)}
        )
      }
  )}

  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.registerForm.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};
  };

  noWhiteSpace(control: AbstractControl): ValidationErrors | null {
    if ((control.value as string).indexOf(' ') >= 0) {
      return { noWhiteSpace: true };
    }
    return null;
  };

  noLetters(control: AbstractControl): ValidationErrors | null {
    if(!/^[0-9]+$/.test(control.value)) {
      return { noLetter: true}
    }
    return null
  };

 forbiddenUsername(users:any = []) {
  return (control: AbstractControl) => {
    return (users.includes(control.value)) ? {
      invalidUsername: true
    } : null;
    };
  }

  emailUsed(users:any = []) {
    return (control: AbstractControl) => {
      return (users.includes(control.value)) ? {
        emailUsed: true
      } : null;
      };
  }


  // get input value
  get userName() {
    return this.registerForm.get('userName')
  }

  get confirmPassword() {
    return this.registerForm.get('confirmPassword')
  }

  get password() {
    return this.registerForm.get('password')
  }

  get phoneNumber() {
    return this.registerForm.get('phoneNumber')
  }

  get email() {
    return this.registerForm.get('email')
  }

  onSubmit(): void {
    if(this.registerForm.valid) {
      this.authService.signUp(this.registerForm.value);
      this.registerForm.reset();
    }else {
      Object.values(this.registerForm.controls).forEach(control => { // set invalid if one value null
        if(control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({onlySelf: true})
        }
      })
    }
  }

}
