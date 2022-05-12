import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { SidenavModule } from 'src/app/components/shared-components/sidenav/sidenav.module';
import { BodyModule } from 'src/app/components/body/body.module';



@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    SidenavModule,
    BodyModule
  ],
  exports:[
    HomeComponent
  ]
})
export class HomeModule { }
