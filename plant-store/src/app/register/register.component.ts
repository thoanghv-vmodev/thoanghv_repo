import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { AccountService } from '../service/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})



export class RegisterComponent implements OnInit {
   @ViewChild("loading") loading: ElementRef<HTMLElement> | undefined;
  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private router: Router,
    private storageFb: AngularFireStorage,
  ) { }

  registerForm!: FormGroup;
  selectedFile: any;
  avatarImg: string | undefined = '';
  downloadURL: Observable<string> | undefined;

  ngOnInit(): void {
    this.registerForm = this.fb.group ({
    userName: ['', [Validators.required,
                   Validators.minLength(4),
                   Validators.maxLength(32),
                   this.forbiddenUsername(['admin', 'manager', ' '])]],
    email: ['', [Validators.required, Validators.email]],
    phoneNumber: ['', [Validators.required, Validators.maxLength(10), this.noLetters]],
    // avatar:[''],
    password: ['', [Validators.required,
                   Validators.maxLength(32),
                   Validators.minLength(6),
                   this.noWhiteSpace]],
    confirmPassword: ['', [Validators.required, this.confirmationValidator]]
    })

  }

  // required
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

  // required bidden username
 forbiddenUsername(users:any = []) {
  return (control: AbstractControl) => {
    return (users.includes(control.value)) ? {
      invalidUsername: true
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

  /* onFileSelected(event:any) {
    this.loading?.nativeElement.classList.add('dis-block')
    var   time = Date.now();
    const file = event.target.files[0];
    const filePath = `AvatarImages/${time}`;
    const fileRef = this.storageFb.ref(filePath);
    const upTask = this.storageFb.upload(`${filePath}`, file);
    upTask
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe(url => {
            if (url) {
              this.avatarImg = url;
              this.registerForm.get('avatar')?.setValue(url)
              this.loading?.nativeElement.classList.remove('dis-block')
            }
            console.log('đây là url',this.avatarImg);
          });
        })
      )
      .subscribe(active => {
        if (active) {
          console.log(active);
        }
      });
  } */

  signup(): void {
    if(this.registerForm.valid) {
      this.accountService.creatAccount(this.registerForm.value).subscribe(
        data => {
          console.warn('submit', data, this.registerForm.value);
          this.registerForm.value.reset();
          alert('Signup Successfully!');
          this.router.navigateByUrl('/login')
        }, err => {
          alert('Something went wrong!')
        }
      )
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
