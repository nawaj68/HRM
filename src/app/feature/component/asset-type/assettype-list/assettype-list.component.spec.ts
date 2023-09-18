import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssettypeListComponent } from './assettype-list.component';

describe('AssettypeListComponent', () => {
  let component: AssettypeListComponent;
  let fixture: ComponentFixture<AssettypeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssettypeListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssettypeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
