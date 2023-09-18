import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProficiencyCreateUpdateComponent } from './proficiency-create-update.component';

describe('ProficiencyCreateUpdateComponent', () => {
  let component: ProficiencyCreateUpdateComponent;
  let fixture: ComponentFixture<ProficiencyCreateUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProficiencyCreateUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProficiencyCreateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
