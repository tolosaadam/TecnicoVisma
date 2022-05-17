import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class LoadingService {
    private _loading = new BehaviorSubject<boolean>(false);
    loading$ = this._loading.asObservable();

    constructor () {}

    show() {
        this._loading.next(true);
      }
    
      hide() {
        this._loading.next(false);
      }
}