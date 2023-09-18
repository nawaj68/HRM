import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupervisorCreateUpdateComponent } from './supervisor-create-update.component';

describe('SupervisorCreateUpdateComponent', () => {
  let component: SupervisorCreateUpdateComponent;
  let fixture: ComponentFixture<SupervisorCreateUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupervisorCreateUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupervisorCreateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
