import { Component, OnDestroy, OnInit } from '@angular/core';
import { timer } from 'rxjs';
import { Subscription } from 'rxjs/internal/Subscription';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-digital-clock-timer',
  templateUrl: './digital-clock-timer.component.html',
  styleUrls: ['./digital-clock-timer.component.scss']
})
export class DigitalClockTimerComponent implements OnInit, OnDestroy {

  userJwt:any = sessionStorage.getItem('userJwt');
  countDown:Subscription = new Subscription;
  counter:any;
  tick = 1000;

  constructor(private api:ApiService) { }

  ngOnInit(): void {
    this.api.GetTokenLifeTime(this.userJwt).subscribe((lifetime:number) => {
      this.counter = lifetime;
    });
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
