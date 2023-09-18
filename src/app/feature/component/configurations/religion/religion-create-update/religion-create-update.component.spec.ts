import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReligionCreateUpdateComponent } from './religion-create-update.component';

describe('ReligionCreateUpdateComponent', () => {
  let component: ReligionCreateUpdateComponent;
  let fixture: ComponentFixture<ReligionCreateUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReligionCreateUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReligionCreateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
