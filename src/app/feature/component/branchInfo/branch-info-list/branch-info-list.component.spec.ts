import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchInfoListComponent } from './branch-info-list.component';

describe('BranchInfoListComponent', () => {
  let component: BranchInfoListComponent;
  let fixture: ComponentFixture<BranchInfoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BranchInfoListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BranchInfoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
