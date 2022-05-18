import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardChartComponent } from './card-chart.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [
    CardChartComponent
  ],
  imports: [
    CommonModule,
    HighchartsChartModule,
    MatIconModule
  ],
  exports:[
    CardChartComponent
  ]
})
export class CardChartModule { }
