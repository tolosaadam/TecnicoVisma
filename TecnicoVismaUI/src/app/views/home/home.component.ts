import { Component, OnInit } from '@angular/core';
import { ISideNavToggle } from 'src/app/models/sidenav.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }

  sideBarOpen = true;

  ngOnInit(): void {
    
  }

  sideBarToggler(){
    this.sideBarOpen = !this.sideBarOpen;
  }

}
