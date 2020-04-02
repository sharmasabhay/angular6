import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddgiftcardComponent } from './addgiftcard.component';

describe('AddgiftcardComponent', () => {
  let component: AddgiftcardComponent;
  let fixture: ComponentFixture<AddgiftcardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddgiftcardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddgiftcardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
