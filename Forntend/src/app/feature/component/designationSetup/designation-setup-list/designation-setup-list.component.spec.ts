import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignationSetupListComponent } from './designation-setup-list.component';

describe('DesignationSetupListComponent', () => {
  let component: DesignationSetupListComponent;
  let fixture: ComponentFixture<DesignationSetupListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DesignationSetupListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DesignationSetupListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
