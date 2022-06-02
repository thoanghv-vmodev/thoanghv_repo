import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCheckOutComponent } from './user-check-out.component';

describe('UserCheckOutComponent', () => {
  let component: UserCheckOutComponent;
  let fixture: ComponentFixture<UserCheckOutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserCheckOutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCheckOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
