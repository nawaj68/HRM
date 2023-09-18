import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetCreateUpdateComponent } from './asset-create-update.component';

describe('AssetCreateUpdateComponent', () => {
  let component: AssetCreateUpdateComponent;
  let fixture: ComponentFixture<AssetCreateUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssetCreateUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetCreateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
