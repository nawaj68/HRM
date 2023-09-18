import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpeningYearCreateUpdateComponent } from './opening-year-create-update.component';

describe('OpeningYearCreateUpdateComponent', () => {
  let component: OpeningYearCreateUpdateComponent;
  let fixture: ComponentFixture<OpeningYearCreateUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpeningYearCreateUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpeningYearCreateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
