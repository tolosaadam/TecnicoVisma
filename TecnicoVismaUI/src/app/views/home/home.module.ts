import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { SidenavModule } from 'src/app/components/shared-components/sidenav/sidenav.module';
import { HeaderModule } from 'src/app/components/shared-components/header/header.module';
import { AppRoutingModule } from 'src/app/app-routing.module';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MetricsModule } from 'src/app/components/metrics/metrics.module';



@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    SidenavModule,
    HeaderModule,
    AppRoutingModule,
    MatSidenavModule,
    MetricsModule
  ],
  exports:[
    HomeComponent
  ]
})
export class HomeModule { }
