import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EducationtypeCreateUpdateComponent } from './educationtype-create-update.component';

describe('EducationtypeCreateUpdateComponent', () => {
  let component: EducationtypeCreateUpdateComponent;
  let fixture: ComponentFixture<EducationtypeCreateUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EducationtypeCreateUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EducationtypeCreateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
