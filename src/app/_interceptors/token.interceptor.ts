import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse, HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {AuthService} from '../_service/auth.service';
import 'rxjs/add/operator/do';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token = this.auth.getToken();
    console.log('toke in 10: ' + token);
    if (token === null) {
      console.log('toke is null in here 11');
      this.auth.getTokenFromWso2().subscribe( r => {
        console.log('token from wso2: ' + r);
        token = r;
        this.auth.setToken(token);
      });
    }
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    // return next.handle(request);
    return next.handle(request).do((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        console.log('httpReponse is good');
      }
    }, (err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401) {
          console.log('unauthorized response');
          this.auth.getTokenFromWso2()
            .subscribe(r => {
              console.log('got token in authservice:' + r);
              this.auth.setToken(r);
            });
        }
      }
    });
  }
}
