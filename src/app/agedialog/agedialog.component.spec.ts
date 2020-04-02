import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgedialogComponent } from './agedialog.component';

describe('AgedialogComponent', () => {
  let component: AgedialogComponent;
  let fixture: ComponentFixture<AgedialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgedialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgedialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
