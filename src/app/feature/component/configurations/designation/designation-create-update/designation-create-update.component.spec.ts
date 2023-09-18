import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignationCreateUpdateComponent } from './designation-create-update.component';

describe('DesignationCreateUpdateComponent', () => {
  let component: DesignationCreateUpdateComponent;
  let fixture: ComponentFixture<DesignationCreateUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DesignationCreateUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DesignationCreateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
