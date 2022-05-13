import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MetricsComponent } from './metrics.component';



@NgModule({
  declarations: [
    MetricsComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    MetricsComponent
  ]
})
export class MetricsModule { }
