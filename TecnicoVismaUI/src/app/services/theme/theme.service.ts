import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ThemeOptionI } from 'src/app/models/themeOption';
import { StyleManagerService } from './style-manager.service';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  constructor(private http: HttpClient, private styleManager: StyleManagerService) { }


  getThemeOptions(): Observable<Array<ThemeOptionI>> {
    return this.http.get<Array<ThemeOptionI>>("assets/settings/options.json");
  }

  setTheme(themeToSet: any) {
    this.styleManager.setStyle(
      "theme",
      `${themeToSet}.css`
    );
  }
}
