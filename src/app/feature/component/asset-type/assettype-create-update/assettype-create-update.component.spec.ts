import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssettypeCreateUpdateComponent } from './assettype-create-update.component';

describe('AssettypeCreateUpdateComponent', () => {
  let component: AssettypeCreateUpdateComponent;
  let fixture: ComponentFixture<AssettypeCreateUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssettypeCreateUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssettypeCreateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
