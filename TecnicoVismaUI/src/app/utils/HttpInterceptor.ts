import { Injectable } from "@angular/core";
import {
    HttpInterceptor,
    HttpRequest,
    HttpErrorResponse,
    HttpHandler,
    HttpEvent,
    HttpHeaders
} from '@angular/common/http';

import { Observable, throwError  } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators'
import { NavigateService } from "../services/navigate/navigate.service";
import { NgToastService } from "ng-angular-popup";
import { LoadingService } from "../components/shared-components/spinner/loading.service";


@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {
    constructor(private loadingService:LoadingService, private navigate:NavigateService,private toast:NgToastService){

    }
    headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authentication': 'Bearer ' + sessionStorage.getItem("userJwt")
    });
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const authReq = request.clone({ headers: request.headers.set("Authentication", 'Bearer ' + sessionStorage.getItem("userJwt")) });

        this.loadingService.show()
        return next.handle(authReq).pipe(finalize(() => this.loadingService.hide()),catchError(err => {


                if (err instanceof HttpErrorResponse) {
                    console.log(err.statusText);
                    if (err.status === 401) {
                        this.navigate.logOut();
                    }
                    else if(err.statusText == "Unknown Error"){
                        this.navigate.logOut();
                        this.toast.error({detail:"Error Message",summary:"An error has occurred, try again later."});
                    }
                }
                return throwError(() => err);
            })) as any;
    }

}