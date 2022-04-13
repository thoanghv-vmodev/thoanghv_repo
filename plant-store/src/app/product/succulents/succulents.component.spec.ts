import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SucculentsComponent } from './succulents.component';

describe('SucculentsComponent', () => {
  let component: SucculentsComponent;
  let fixture: ComponentFixture<SucculentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SucculentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SucculentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
