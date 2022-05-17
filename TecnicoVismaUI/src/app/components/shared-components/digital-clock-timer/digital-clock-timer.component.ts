import { Component, OnDestroy, OnInit } from '@angular/core';
import { timer } from 'rxjs';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-digital-clock-timer',
  templateUrl: './digital-clock-timer.component.html',
  styleUrls: ['./digital-clock-timer.component.scss']
})
export class DigitalClockTimerComponent implements OnInit, OnDestroy {

  sessionTime:any = sessionStorage.getItem('userSessionTime');
  countDown:Subscription = new Subscription;
  counter:any = parseInt(this.sessionTime);
  tick = 1000;

  constructor() { }

  ngOnInit(): void {
    this.countDown = timer(0, this.tick)
      .subscribe(() =>{
        --this.counter
        if(this.counter == 0){
          this.countDown.unsubscribe();
        }
      })
        
  }
  ngOnDestroy() {
    this.countDown.unsubscribe();
  }

  transform(value: number): string {
    const minutes: number = Math.floor(value / 60);
    return ('00' + minutes).slice(-2) + ':' + ('00' + Math.floor(value - minutes * 60)).slice(-2);
  }

  

}
