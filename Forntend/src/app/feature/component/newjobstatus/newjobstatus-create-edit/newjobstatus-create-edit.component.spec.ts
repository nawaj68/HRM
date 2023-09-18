import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewjobstatusCreateEditComponent } from './newjobstatus-create-edit.component';

describe('NewjobstatusCreateEditComponent', () => {
  let component: NewjobstatusCreateEditComponent;
  let fixture: ComponentFixture<NewjobstatusCreateEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewjobstatusCreateEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewjobstatusCreateEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
