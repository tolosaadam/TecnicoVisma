import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PieChartComponent } from './pie-chart.component';
import { HighchartsChartModule } from 'highcharts-angular';



@NgModule({
  declarations: [
    PieChartComponent
  ],
  imports: [
    CommonModule,
    HighchartsChartModule
  ],
  exports:[
    PieChartComponent
  ]
})
export class PieChartModule { }
