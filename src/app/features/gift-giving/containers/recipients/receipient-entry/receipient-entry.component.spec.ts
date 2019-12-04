import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceipientEntryComponent } from './receipient-entry.component';

describe('ReceipientEntryComponent', () => {
  let component: ReceipientEntryComponent;
  let fixture: ComponentFixture<ReceipientEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReceipientEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceipientEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
