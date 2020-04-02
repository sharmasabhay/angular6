import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GiftpackagingComponent } from './giftpackaging.component';

describe('GiftpackagingComponent', () => {
  let component: GiftpackagingComponent;
  let fixture: ComponentFixture<GiftpackagingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GiftpackagingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GiftpackagingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
