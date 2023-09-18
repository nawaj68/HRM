import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetRequisitionCreateUpdateComponent } from './asset-requisition-create-update.component';

describe('AssetRequisitionCreateUpdateComponent', () => {
  let component: AssetRequisitionCreateUpdateComponent;
  let fixture: ComponentFixture<AssetRequisitionCreateUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssetRequisitionCreateUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetRequisitionCreateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
