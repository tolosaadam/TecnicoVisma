import { ThisReceiver } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { SettingsI } from 'src/app/models/comunication-models/environment-settings.interface';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  public settings: SettingsI;

  constructor() {
    this.settings = new SettingsI();
   }
}
