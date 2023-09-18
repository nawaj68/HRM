import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GradeCreateUpdateComponent } from './grade-create-update.component';

describe('GradeCreateUpdateComponent', () => {
  let component: GradeCreateUpdateComponent;
  let fixture: ComponentFixture<GradeCreateUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GradeCreateUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GradeCreateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
