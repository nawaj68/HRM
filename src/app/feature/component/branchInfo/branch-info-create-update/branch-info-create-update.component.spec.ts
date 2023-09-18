import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchInfoCreateUpdateComponent } from './branch-info-create-update.component';

describe('BranchInfoCreateUpdateComponent', () => {
  let component: BranchInfoCreateUpdateComponent;
  let fixture: ComponentFixture<BranchInfoCreateUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BranchInfoCreateUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BranchInfoCreateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
