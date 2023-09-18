import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetRequisitionListComponent } from './asset-requisition-list.component';

describe('AssetRequisitionListComponent', () => {
  let component: AssetRequisitionListComponent;
  let fixture: ComponentFixture<AssetRequisitionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssetRequisitionListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetRequisitionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
