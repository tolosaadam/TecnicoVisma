import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NavigateService } from 'src/app/services/navigate/navigate.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() toggleSideBarForMe: EventEmitter<any> = new  EventEmitter()
  
  constructor(private navigate:NavigateService) { }

  ngOnInit(): void {
  }

  toggleSideBar(){
    this.toggleSideBarForMe.emit();
    setTimeout(() => {
      window.dispatchEvent(
        new Event('resize')
      );
    }, 300);

  }

  logOut(){
    this.navigate.logOut();
  }
}
