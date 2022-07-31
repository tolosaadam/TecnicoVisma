import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerModule } from './spinner/spinner.module';
import { ThemeMenuModule } from './theme-menu/theme-menu.module';



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    SpinnerModule,
    ThemeMenuModule
  ],
  exports: [SpinnerModule]
})
export class SharedComponentsModule { }
