import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SettingsI } from 'src/app/models/comunication-models/environment-settings.interface';
import { SettingsService } from './settings.service';

@Injectable({
  providedIn: 'root'
})
export class SettingsHttpService {

  constructor(private http: HttpClient, private settingsService:SettingsService) { }

  async initializeApp(): Promise<any> {
    return await new Promise<void>(
      (resolve) => {
        this.http.get('../../../assets/settings/environment-settings.json')
        .subscribe(response => {
          this.settingsService.settings = <SettingsI>response;
          resolve();
        });
      }
    );
  }
}
