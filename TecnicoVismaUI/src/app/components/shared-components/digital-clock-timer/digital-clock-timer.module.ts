import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DigitalClockTimerComponent } from './digital-clock-timer.component';



@NgModule({
  declarations: [
    DigitalClockTimerComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    DigitalClockTimerComponent
  ]
})
export class DigitalClockTimerModule { }
