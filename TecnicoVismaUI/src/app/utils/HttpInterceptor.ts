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
import { catchError } from 'rxjs/operators'
import { Router } from '@angular/router'
import { NavigateService } from "../services/navigate/navigate.service";


@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {
    constructor(private router: Router, private navigate:NavigateService){

    }
    headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authentication': 'Bearer ' + sessionStorage.getItem("userJwt")
    });
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const authReq = req.clone({ headers: req.headers.set("Authentication", 'Bearer ' + sessionStorage.getItem("userJwt")) });

        return next.handle(authReq).pipe(catchError(err => {


                if (err instanceof HttpErrorResponse) {

                    if (err.status === 401) {
                        this.navigate.logOut();
                    }
                }
                return throwError(() => err);
            })) as any;
    }
}