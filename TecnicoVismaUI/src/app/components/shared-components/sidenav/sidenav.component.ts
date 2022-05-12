import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { navbarData } from './nav-data';
import { ISideNavToggle } from '../../../models/sidenav.interface';


@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  @Output() onToggleSideNav: EventEmitter<ISideNavToggle> = new EventEmitter();
  collapsed = false;
  screenWidth = 0;
  navData = [navbarData]
  // constructor() {
    
  //  }

  ngOnInit(): void {
    console.log(window.innerWidth);
    this.screenWidth = window.innerWidth;
    console.log(this.screenWidth);
    console.log(window.innerWidth);
  }

  toggleCollapse(){
    this.collapsed = !this.collapsed;
    this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth})
  }

  closeSidenav():void{
    this.collapsed = false;
    this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: 125})
  }

}
