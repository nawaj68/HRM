import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaritalStatusListComponent } from './marital-status-list.component';

describe('MaritalStatusListComponent', () => {
  let component: MaritalStatusListComponent;
  let fixture: ComponentFixture<MaritalStatusListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaritalStatusListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaritalStatusListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
