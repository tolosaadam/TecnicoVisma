import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BigChartComponent } from './big-chart.component';
import { HighchartsChartModule } from 'highcharts-angular';



@NgModule({
  declarations: [
    BigChartComponent
  ],
  imports: [
    CommonModule,
    HighchartsChartModule
  ],
  exports:[
    BigChartComponent
  ]
})
export class BigChartModule { }
