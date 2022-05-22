import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MetricsComponent } from './metrics.component';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { ChartsComponentsModule } from '../charts-components/charts-components.module';
import { FlexLayoutModule } from '@angular/flex-layout';



@NgModule({
  declarations: [
    MetricsComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatDividerModule,
    ChartsComponentsModule,
    FlexLayoutModule
    
  ],
  exports:[
    MetricsComponent
  ],
  providers:[DatePipe]
})
export class MetricsModule { }
