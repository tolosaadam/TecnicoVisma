import { Component, OnInit } from '@angular/core';
import mixpanel from 'mixpanel-browser';
import { SettingsService } from './services/settings/settings.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  mixPanelToken:string = '';
  constructor(private settingsService:SettingsService) {
    this.mixPanelToken = this.settingsService.settings.mixpanelToken;
  }

  ngOnInit():void{
    mixpanel.init(this.mixPanelToken);
  }
  title = 'TecnicoVismaUI';
  
}
