import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingMasterComponent } from './booking-master.component';

describe('BookingMasterComponent', () => {
  let component: BookingMasterComponent;
  let fixture: ComponentFixture<BookingMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookingMasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookingMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
