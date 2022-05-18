import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BigChartModule } from './big-chart/big-chart.module';
import { CardChartModule } from './card-chart/card-chart.module';
import { PieChartModule } from './pie-chart/pie-chart.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BigChartModule,
    CardChartModule,
    PieChartModule
  ],
  exports:[
    BigChartModule,
    CardChartModule,
    PieChartModule
  ]
})
export class ChartsComponentsModule { }
