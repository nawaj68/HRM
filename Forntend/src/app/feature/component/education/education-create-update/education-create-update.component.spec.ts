import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EducationCreateUpdateComponent } from './education-create-update.component';

describe('EducationCreateUpdateComponent', () => {
  let component: EducationCreateUpdateComponent;
  let fixture: ComponentFixture<EducationCreateUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EducationCreateUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EducationCreateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
