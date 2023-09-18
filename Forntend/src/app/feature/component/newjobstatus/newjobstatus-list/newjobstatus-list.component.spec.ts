import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewjobstatusListComponent } from './newjobstatus-list.component';

describe('NewjobstatusListComponent', () => {
  let component: NewjobstatusListComponent;
  let fixture: ComponentFixture<NewjobstatusListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewjobstatusListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewjobstatusListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
