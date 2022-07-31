import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatButtonModule} from '@angular/material/button';
import { DigitalClockTimerModule } from '../digital-clock-timer/digital-clock-timer.module';
import {MatTooltipModule} from '@angular/material/tooltip';
import { ThemeMenuModule } from '../theme-menu/theme-menu.module';



@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    FlexLayoutModule,
    MatButtonModule,
    DigitalClockTimerModule,
    MatTooltipModule,
    ThemeMenuModule
  ],
  exports:[
    HeaderComponent
  ]
})
export class HeaderModule { }
