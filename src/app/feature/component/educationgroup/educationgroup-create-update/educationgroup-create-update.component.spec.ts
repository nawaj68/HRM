import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EducationgroupCreateUpdateComponent } from './educationgroup-create-update.component';

describe('EducationgroupCreateUpdateComponent', () => {
  let component: EducationgroupCreateUpdateComponent;
  let fixture: ComponentFixture<EducationgroupCreateUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EducationgroupCreateUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EducationgroupCreateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
