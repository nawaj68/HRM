import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EducationgroupListComponent } from './educationgroup-list.component';

describe('EducationgroupListComponent', () => {
  let component: EducationgroupListComponent;
  let fixture: ComponentFixture<EducationgroupListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EducationgroupListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EducationgroupListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
