import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistributeAssetListComponent } from './distribute-asset-list.component';

describe('DistributeAssetListComponent', () => {
  let component: DistributeAssetListComponent;
  let fixture: ComponentFixture<DistributeAssetListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DistributeAssetListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DistributeAssetListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
