import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeMenuComponent } from './theme-menu.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';


@NgModule({
  declarations: [ThemeMenuComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatToolbarModule
  ],
  exports:[
    ThemeMenuComponent
  ]
})
export class ThemeMenuModule { }
