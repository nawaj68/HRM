import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EducationtypeListComponent } from './educationtype-list.component';

describe('EducationtypeListComponent', () => {
  let component: EducationtypeListComponent;
  let fixture: ComponentFixture<EducationtypeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EducationtypeListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EducationtypeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
