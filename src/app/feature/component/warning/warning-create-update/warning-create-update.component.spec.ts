import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarningCreateUpdateComponent } from './warning-create-update.component';

describe('WarningCreateUpdateComponent', () => {
  let component: WarningCreateUpdateComponent;
  let fixture: ComponentFixture<WarningCreateUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WarningCreateUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WarningCreateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
