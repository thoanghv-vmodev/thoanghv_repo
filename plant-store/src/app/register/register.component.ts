import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray, AbstractControl } from '@angular/forms';

export function forbiddenUsername(users:any = []) {
  return (c: AbstractControl) => {
    return (users.includes(c.value)) ? {
      invalidusername: true
    } : null;
  };
}

export function comparePassword(c: AbstractControl) {
  const v = c.value;
  return (v.password === v.confirmPassword) ? null: {
    passwordnotmatch: true
  }
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})



export class RegisterComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
  ) { }

  registerForm!: FormGroup;

  ngOnInit(): void {

  // Tạo thông thường.

  /* this.registerForm = new FormGroup({
    userName: new FormControl('',[Validators.required, Validators.minLength(6)]),
    email: new FormControl(''),
    phoneNumber: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
    address: new FormControl(''),
  }); */

  // Sử dụng FormBuilder

    this.registerForm = this.fb.group ({
    userName: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(18), forbiddenUsername(['admin', 'manager'])]],
    email: ['', [Validators.required, Validators.email]],
    phoneNumber: ['', [Validators.required]],
    password: ['', [Validators.required]],
    confirmPassword: ['', [Validators.required, this.confirmationValidator]],
    address: ['', [Validators.required]],
    })

  }

  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.registerForm.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};
  };

  get userName() {
    return this.registerForm.get('userName')
  }

  get confirmPassword() {
    return this.registerForm.get('confirmPassword')
  }

  get address() {
    return this.registerForm.get('address')
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

  onSubmit() {
  console.warn(this.registerForm.value);
  this.registerForm.reset();
  }

}
