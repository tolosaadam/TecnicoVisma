import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import mixpanel from 'mixpanel-browser';
import { defer, from, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MixpanelService {

  constructor(private http:HttpClient) { }
  
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

	
  async getData():Promise<Observable<any>>{


    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Basic T3duZXIuOGRlZDRkLm1wLXNlcnZpY2UtYWNjb3VudDpDNWV6RURPYlZsU2Y0WFdaT2ZCeU1kcUN0eTFoN01xdg==");
    myHeaders.append("Cookie", "mp__origin=\"\"; mp__origin_referrer=\"https://mixpanel.com/project/2719248\"");

    var requestOptions:any = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    const response = await fetch("https://mixpanel.com/api/2.0/insights?project_id=2719248&bookmark_id=30109524", requestOptions);
    const result_1 = await response.json();
    return result_1;
  }
}
