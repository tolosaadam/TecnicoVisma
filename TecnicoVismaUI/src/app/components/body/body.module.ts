import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BodyComponent } from './body.component';
import { AppRoutingModule } from 'src/app/app-routing.module';


@NgModule({
  declarations: [
    BodyComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule
  ],
  exports:[
    BodyComponent
  ]
})
export class BodyModule { }
