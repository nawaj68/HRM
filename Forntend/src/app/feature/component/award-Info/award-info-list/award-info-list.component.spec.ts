import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AwardInfoListComponent } from './award-info-list.component';

describe('AwardInfoListComponent', () => {
  let component: AwardInfoListComponent;
  let fixture: ComponentFixture<AwardInfoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AwardInfoListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AwardInfoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
