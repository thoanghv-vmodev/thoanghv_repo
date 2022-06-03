import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CategoryDetails } from './category-details.component';


describe('SucculentsComponent', () => {
  let component: CategoryDetails;
  let fixture: ComponentFixture<CategoryDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoryDetails ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
