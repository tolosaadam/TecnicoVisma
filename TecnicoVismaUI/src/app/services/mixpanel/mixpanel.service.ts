import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import mixpanel from 'mixpanel-browser';
import { NgToastService } from 'ng-angular-popup';
import { Observable } from 'rxjs';
import { LoadingService } from 'src/app/components/shared-components/spinner/loading.service';
import { SettingsService } from '../settings/settings.service';

@Injectable({
  providedIn: 'root'
})
export class MixpanelService {
  projectId:string = '';
  productsBookMarkId:string = '';
  allEventsBookMarkId:string = '';
  mixPanelCredentials:string = '';

  constructor(private settingsService:SettingsService, private http:HttpClient,private toast:NgToastService,private loadingService:LoadingService) {
    this.projectId = this.settingsService.settings.mixpanelProjectID;
    this.productsBookMarkId = this.settingsService.settings.mixpanelPorductsBookMarkID;
    this.allEventsBookMarkId = this.settingsService.settings.mixpanelAllEventsBookMarkID;
    this.mixPanelCredentials = this.settingsService.settings.mixpanelCredentials;
   }
  
  
  /**
   * Initialize mixpanel.
   *
   * @param {string} userToken
   * @memberof MixpanelService
   */
   init(userEmail: string, userName:string, userLastName:string): void {
    mixpanel.identify(userEmail);
    mixpanel.people.set({"$name":userName, "$email":userEmail, "$lastName":userLastName});
  }

  /**
   * Push new action to mixpanel.
   *
   * @param {string} id Name of the action to track.
   * @param {*} [action={}] Actions object with custom properties.
   * @memberof MixpanelService
   */
  track(id: string, action: any = {}): void {
    mixpanel.track(id, action);
  }

	
  async getAllEventsData():Promise<Observable<any>>{
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Basic " + this.mixPanelCredentials);
    myHeaders.append("Cookie", "mp__origin=\"\"; mp__origin_referrer=\"https://mixpanel.com/project/" + this.projectId + "\"");

    var requestOptions:any = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    return await fetch("https://mixpanel.com/api/2.0/insights?project_id=" + this.projectId + "&bookmark_id=" + this.allEventsBookMarkId, requestOptions).then(response => {
      return response.json();
    }).catch(err => {
      this.loadingService.hide();
      this.toast.error({detail:"Error Message",summary:'Failure to load real metric data.'});
      return "error"
    });
  }

  async getAllProcutsCategoryData():Promise<Observable<any>>{
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Basic T3duZXIuOGRlZDRkLm1wLXNlcnZpY2UtYWNjb3VudDpDNWV6RURPYlZsU2Y0WFdaT2ZCeU1kcUN0eTFoN01xdg==");
    myHeaders.append("Cookie", "mp__origin=\"\"; mp__origin_referrer=\"https://mixpanel.com/project/" + this.projectId + "\"");

    var requestOptions:any = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    return await fetch("https://mixpanel.com/api/2.0/insights?project_id=" + this.projectId + "&bookmark_id=" + this.productsBookMarkId, requestOptions).then(response => {
      return response.json();
    }).catch(err => {
      this.loadingService.hide();
      this.toast.error({detail:"Error Message",summary:"Failure to load real metric data."});
      return "error"
    });
  }
}
