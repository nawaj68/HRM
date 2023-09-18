import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilyInformationCreateUpdateComponent } from './family-information-create-update.component';

describe('FamilyInformationCreateUpdateComponent', () => {
  let component: FamilyInformationCreateUpdateComponent;
  let fixture: ComponentFixture<FamilyInformationCreateUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FamilyInformationCreateUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FamilyInformationCreateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
