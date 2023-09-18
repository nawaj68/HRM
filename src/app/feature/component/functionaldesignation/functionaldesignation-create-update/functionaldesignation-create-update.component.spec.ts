import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FunctionaldesignationCreateUpdateComponent } from './functionaldesignation-create-update.component';

describe('FunctionaldesignationCreateUpdateComponent', () => {
  let component: FunctionaldesignationCreateUpdateComponent;
  let fixture: ComponentFixture<FunctionaldesignationCreateUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FunctionaldesignationCreateUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FunctionaldesignationCreateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
