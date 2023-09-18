import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProficiencyListComponent } from './proficiency-list.component';

describe('ProficiencyListComponent', () => {
  let component: ProficiencyListComponent;
  let fixture: ComponentFixture<ProficiencyListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProficiencyListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProficiencyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
