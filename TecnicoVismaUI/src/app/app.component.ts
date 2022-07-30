import { Component, Input, OnInit } from '@angular/core';
import mixpanel from 'mixpanel-browser';
import { SettingsService } from './services/settings/settings.service';
import { ThemeService } from './services/theme/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  @Input() userTheme: any = localStorage.getItem('userTheme');

  mixPanelToken:string = '';
  constructor(private settingsService:SettingsService, private themeService: ThemeService) {
    this.mixPanelToken = this.settingsService.settings.mixpanelToken;
  }

  ngOnInit():void{
    if(this.userTheme != null){
      this.themeService.setTheme(this.userTheme);
    }else{
      this.themeService.setTheme("deeppurple-amber");
    }
    mixpanel.init(this.mixPanelToken);
  }
  title = 'TecnicoVismaUI';
  
}
