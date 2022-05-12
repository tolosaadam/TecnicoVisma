import { Component } from '@angular/core';
import { ISideNavToggle } from './models/sidenav.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'TecnicoVismaUI';

  isSideNavCollapsed = false;
  screenWidth = 0;

  onToggleSideNav(data: ISideNavToggle): void{
    this.screenWidth = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed;
  }


}
