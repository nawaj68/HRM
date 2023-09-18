import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupervisorsetupCreateUpdateComponent } from './supervisorsetup-create-update.component';

describe('SupervisorsetupCreateUpdateComponent', () => {
  let component: SupervisorsetupCreateUpdateComponent;
  let fixture: ComponentFixture<SupervisorsetupCreateUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupervisorsetupCreateUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupervisorsetupCreateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
