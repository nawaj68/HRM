import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HobbyTypeListComponent } from './hobby-type-list.component';

describe('HobbyTypeListComponent', () => {
  let component: HobbyTypeListComponent;
  let fixture: ComponentFixture<HobbyTypeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HobbyTypeListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HobbyTypeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
