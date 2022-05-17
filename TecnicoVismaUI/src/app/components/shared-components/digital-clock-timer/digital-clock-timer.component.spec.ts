import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DigitalClockTimerComponent } from './digital-clock-timer.component';

describe('DigitalClockTimerComponent', () => {
  let component: DigitalClockTimerComponent;
  let fixture: ComponentFixture<DigitalClockTimerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DigitalClockTimerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DigitalClockTimerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
