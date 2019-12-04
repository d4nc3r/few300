import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceipientListComponent } from './receipient-list.component';

describe('ReceipientListComponent', () => {
  let component: ReceipientListComponent;
  let fixture: ComponentFixture<ReceipientListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReceipientListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceipientListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
