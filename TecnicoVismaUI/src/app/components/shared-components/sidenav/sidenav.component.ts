import { Component, OnInit, Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  user:any = {
    name : '',
    lastName: '',
    mailAddress: ''
  }

  constructor() {
    
   }

  ngOnInit(): void {
    this.user.name = sessionStorage.getItem('userName');
    this.user.lastName = sessionStorage.getItem('userLastName');
    this.user.mailAddress = sessionStorage.getItem('userMailAddress');
  }
}
