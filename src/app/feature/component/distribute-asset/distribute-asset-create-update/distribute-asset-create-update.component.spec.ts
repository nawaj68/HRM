import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistributeAssetCreateUpdateComponent } from './distribute-asset-create-update.component';

describe('DistributeAssetCreateUpdateComponent', () => {
  let component: DistributeAssetCreateUpdateComponent;
  let fixture: ComponentFixture<DistributeAssetCreateUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DistributeAssetCreateUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DistributeAssetCreateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
