import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { SidenavModule } from 'src/app/components/shared-components/sidenav/sidenav.module';
import { BodyModule } from 'src/app/components/body/body.module';
import { HeaderModule } from 'src/app/components/shared-components/header/header.module';
import { AppRoutingModule } from 'src/app/app-routing.module';
import {MatSidenavModule} from '@angular/material/sidenav';



@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    SidenavModule,
    BodyModule,
    HeaderModule,
    AppRoutingModule,
    MatSidenavModule
  ],
  exports:[
    HomeComponent
  ]
})
export class HomeModule { }
