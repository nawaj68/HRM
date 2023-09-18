import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmploymentCategoryCreateUpdateComponent } from './employment-category-create-update.component';

describe('EmploymentCategoryCreateUpdateComponent', () => {
  let component: EmploymentCategoryCreateUpdateComponent;
  let fixture: ComponentFixture<EmploymentCategoryCreateUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmploymentCategoryCreateUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmploymentCategoryCreateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
