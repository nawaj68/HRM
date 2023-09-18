import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarningTypeCreateUpdateComponent } from './warning-type-create-update.component';

describe('WarningTypeCreateUpdateComponent', () => {
  let component: WarningTypeCreateUpdateComponent;
  let fixture: ComponentFixture<WarningTypeCreateUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WarningTypeCreateUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WarningTypeCreateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
