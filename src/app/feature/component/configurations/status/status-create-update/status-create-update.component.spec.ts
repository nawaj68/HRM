import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusCreateUpdateComponent } from './status-create-update.component';

describe('StatusCreateUpdateComponent', () => {
  let component: StatusCreateUpdateComponent;
  let fixture: ComponentFixture<StatusCreateUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatusCreateUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusCreateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
