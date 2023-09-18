import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignationSetupCreateUpdateComponent } from './designation-setup-create-update.component';

describe('DesignationSetupCreateUpdateComponent', () => {
  let component: DesignationSetupCreateUpdateComponent;
  let fixture: ComponentFixture<DesignationSetupCreateUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DesignationSetupCreateUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DesignationSetupCreateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
