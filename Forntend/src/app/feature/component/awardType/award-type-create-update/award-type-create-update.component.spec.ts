import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AwardTypeCreateUpdateComponent } from './award-type-create-update.component';

describe('AwardTypeCreateUpdateComponent', () => {
  let component: AwardTypeCreateUpdateComponent;
  let fixture: ComponentFixture<AwardTypeCreateUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AwardTypeCreateUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AwardTypeCreateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
