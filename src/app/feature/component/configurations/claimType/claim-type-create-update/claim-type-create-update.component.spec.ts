import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimTypeCreateUpdateComponent } from './claim-type-create-update.component';

describe('ClaimTypeCreateUpdateComponent', () => {
  let component: ClaimTypeCreateUpdateComponent;
  let fixture: ComponentFixture<ClaimTypeCreateUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClaimTypeCreateUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClaimTypeCreateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
