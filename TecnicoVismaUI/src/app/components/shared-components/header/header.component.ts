import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { ThemeOptionI } from 'src/app/models/themeOption';
import { NavigateService } from 'src/app/services/navigate/navigate.service';
import { ThemeService } from 'src/app/services/theme/theme.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  options$: Observable<Array<ThemeOptionI>> = this.themeService.getThemeOptions();

  @Output() toggleSideBarForMe: EventEmitter<any> = new  EventEmitter()
  
  constructor(private themeService: ThemeService, private navigate:NavigateService, private overlay: OverlayContainer) { }

  ngOnInit(): void {
    // this.isDarkTheme = this.themeService.isDarkTheme;
    this.themeService.setTheme("deeppurple-amber");
  }

  themeChangeHandler(themeToSet: any) {
    this.themeService.setTheme(themeToSet);
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
