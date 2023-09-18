import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimTypeListComponent } from './claim-type-list.component';

describe('ClaimTypeListComponent', () => {
  let component: ClaimTypeListComponent;
  let fixture: ComponentFixture<ClaimTypeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClaimTypeListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClaimTypeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
