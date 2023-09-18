import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarningTypeListComponent } from './warning-type-list.component';

describe('WarningTypeListComponent', () => {
  let component: WarningTypeListComponent;
  let fixture: ComponentFixture<WarningTypeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WarningTypeListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WarningTypeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
