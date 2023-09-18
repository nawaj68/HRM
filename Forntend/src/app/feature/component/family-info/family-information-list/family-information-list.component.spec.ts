import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilyInformationListComponent } from './family-information-list.component';

describe('FamilyInformationListComponent', () => {
  let component: FamilyInformationListComponent;
  let fixture: ComponentFixture<FamilyInformationListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FamilyInformationListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FamilyInformationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
