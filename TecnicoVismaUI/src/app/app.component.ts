import { Component, OnInit } from '@angular/core';
import mixpanel from 'mixpanel-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  ngOnInit():void{
    mixpanel.init("5b90abf3d5e01516da41eb24e3a6af8e");
  }
  title = 'TecnicoVismaUI';
  
}
