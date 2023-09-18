import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HobbyTypeCreateUpdateComponent } from './hobby-type-create-update.component';

describe('HobbyTypeCreateUpdateComponent', () => {
  let component: HobbyTypeCreateUpdateComponent;
  let fixture: ComponentFixture<HobbyTypeCreateUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HobbyTypeCreateUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HobbyTypeCreateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
