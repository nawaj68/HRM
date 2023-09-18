import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FunctionaldesignationListComponent } from './functionaldesignation-list.component';

describe('FunctionaldesignationListComponent', () => {
  let component: FunctionaldesignationListComponent;
  let fixture: ComponentFixture<FunctionaldesignationListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FunctionaldesignationListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FunctionaldesignationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
