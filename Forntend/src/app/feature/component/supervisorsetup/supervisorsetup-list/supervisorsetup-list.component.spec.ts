import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupervisorsetupListComponent } from './supervisorsetup-list.component';

describe('SupervisorsetupListComponent', () => {
  let component: SupervisorsetupListComponent;
  let fixture: ComponentFixture<SupervisorsetupListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupervisorsetupListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupervisorsetupListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
