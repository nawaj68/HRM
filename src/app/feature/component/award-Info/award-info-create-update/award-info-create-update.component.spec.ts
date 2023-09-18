import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AwardInfoCreateUpdateComponent } from './award-info-create-update.component';

describe('AwardInfoCreateUpdateComponent', () => {
  let component: AwardInfoCreateUpdateComponent;
  let fixture: ComponentFixture<AwardInfoCreateUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AwardInfoCreateUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AwardInfoCreateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
