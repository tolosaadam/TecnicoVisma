import { Component, OnInit } from '@angular/core';
import { ISideNavToggle } from 'src/app/models/sidenav.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    
  }

  isSideNavCollapsed = false;
  screenWidth = 0;

  onToggleSideNav(data: ISideNavToggle): void{
    this.screenWidth = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed;
  }

}
