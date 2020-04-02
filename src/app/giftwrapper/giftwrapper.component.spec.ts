import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GiftwrapperComponent } from './giftwrapper.component';

describe('GiftwrapperComponent', () => {
  let component: GiftwrapperComponent;
  let fixture: ComponentFixture<GiftwrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GiftwrapperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GiftwrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
