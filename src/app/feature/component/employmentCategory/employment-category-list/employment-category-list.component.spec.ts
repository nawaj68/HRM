import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmploymentCategoryListComponent } from './employment-category-list.component';

describe('EmploymentCategoryListComponent', () => {
  let component: EmploymentCategoryListComponent;
  let fixture: ComponentFixture<EmploymentCategoryListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmploymentCategoryListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmploymentCategoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
