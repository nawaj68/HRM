import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstituteCreateUpdateComponent } from './institute-create-update.component';

describe('InstituteCreateUpdateComponent', () => {
  let component: InstituteCreateUpdateComponent;
  let fixture: ComponentFixture<InstituteCreateUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstituteCreateUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InstituteCreateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
