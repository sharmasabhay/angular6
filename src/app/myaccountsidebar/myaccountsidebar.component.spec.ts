import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyaccountsidebarComponent } from './myaccountsidebar.component';

describe('MyaccountsidebarComponent', () => {
  let component: MyaccountsidebarComponent;
  let fixture: ComponentFixture<MyaccountsidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyaccountsidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyaccountsidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
