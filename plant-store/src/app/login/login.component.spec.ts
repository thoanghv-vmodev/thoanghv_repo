import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { BrowserModule, By } from '@angular/platform-browser';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent
      ],
      imports: [
        BrowserModule,
        FormsModule,
      ]
    })
    .compileComponents().then(() => {
      fixture = TestBed.createComponent(LoginComponent);

      de = fixture.debugElement.query(By.css('form'));
      el = de.nativeElement
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should call  the onSubmit method`, async () => {
    fixture.detectChanges();
    spyOn(component, 'login');
    el = fixture.debugElement.query(By.css('button')).nativeElement;
    el.click();
    expect(component.login).toHaveBeenCalledTimes(0);
  });

  it(`form should be invalid`, async (() => {
      component.loginForm.controls['name'].setValue('');
      component.loginForm.controls['password'].setValue('');
      expect(component.loginForm.valid).toBeFalsy();
  }));

  it(`form should be invalid`, async (() => {
      component.loginForm.controls['name'].setValue('thoang@qw.com');
      component.loginForm.controls['password'].setValue('thoang123');
      expect(component.loginForm.valid).toBeTruthy();
  }));


});
