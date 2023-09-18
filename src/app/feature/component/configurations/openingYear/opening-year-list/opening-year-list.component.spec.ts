import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpeningYearListComponent } from './opening-year-list.component';

describe('OpeningYearListComponent', () => {
  let component: OpeningYearListComponent;
  let fixture: ComponentFixture<OpeningYearListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpeningYearListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpeningYearListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
